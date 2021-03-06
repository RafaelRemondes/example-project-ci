pipeline {
	agent {
		label "jenkins-test-nodejs"
	}
	environment {
		ORG               = 'jx-registry-test'
		APP_NAME          = 'example-project-ci'
		DB_HOST           = '172.17.0.1'
		CHARTMUSEUM_CREDS = credentials('jenkins-x-chartmuseum')
	}
	stages {
		stage('CI Build and push snapshot') {
			when {
				branch 'PR-*'
			}
			environment {
				PREVIEW_VERSION = "0.0.0-SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"
				PREVIEW_NAMESPACE = "$APP_NAME-$BRANCH_NAME".toLowerCase()
				HELM_RELEASE = "$PREVIEW_NAMESPACE".toLowerCase()
			}
			steps {
				container('test-nodejs') {
					sh "yarn install"
					sh "docker-compose up -d"
					sh "yarn test"
					//sh 'export VERSION=$PREVIEW_VERSION && skaffold build -f skaffold.yaml'
                                        sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:$PREVIEW_VERSION"
				}

				dir ('./charts/preview') {
					container('test-nodejs') {
						sh "make preview"
						sh "jx preview --app $APP_NAME --dir ../.."
					}
				}
			}
		}
		stage('Set Up Git') {
			when {
				branch 'master'
			}
			steps {
				container('test-nodejs') {
					sh "git checkout master"
					sh "git config --global credential.helper store"
					sh "jx step git credentials"
					sh "echo \$(jx-release-version) > VERSION"
				}
				dir ('./charts/example-project-ci') {
					container('test-nodejs') {
						sh "make tag"
					}
				}
			}
		}
		stage('Build Release') {
			when {
				branch 'master'
			}
			parallel {
				stage('install dependencies') {
                                        steps {
						container('test-nodejs') {
							sh "yarn install"
						}
                                        }
				}
				stage('start services') {
                                        steps {
						container('test-nodejs') {
							sh "docker-compose up -d"
						}
                                        }
				}
				stage('auth') {
                                        steps {
						container('test-nodejs') {
							sh 'gcloud auth activate-service-account rafaelremondes@jx-registry-test.iam.gserviceaccount.com --key-file=/home/jenkins/.auth/JX-Registry-Test-84e5f80822db.json'
						}
					}
                               }	
			}
		}
		stage('run tests and deploy') {
			when{
				branch 'master'
                        }
                	steps {
				container('test-nodejs') {
					sh "yarn test"
				      //sh 'export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml'
				        sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:\$(cat VERSION)"
				}
			}  
		}
		stage('Promote to Environments') {
			when{
				branch 'master'
			}
			steps {
				dir ('./charts/example-project-ci') {
					container('test-nodejs') {
						sh 'jx step changelog --version v\$(cat ../../VERSION)'
						sh 'jx step helm release'
                                      		//sh 'jx promote -b --all-auto --timeout 1h --version \$(cat ../../VERSION)'
				        }
				}
			}
		}
	}
	post {
		always {
			cleanWs()
		}
		failure {
			input """Pipeline failed.
				We will keep the build pod around to help you diagnose any failures.
				Select Proceed or Abort to terminate the build pod"""
		}
	}
}
