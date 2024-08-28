pipeline{
  agent any

  environment{
    ENVIROMENT = credentials('API_LOGIN_SSR_APP')
  }

  stages{
    stage('Copy .env files') {
      steps {
        script {
          def env = readFile(ENVIROMENT)
          writeFile file: './.env', text: env
        }
      }
    }
    stage('Stop Containers and remove Image'){
      steps{
        script{
          sh 'docker compose down'
            def imageExists = sh(script: 'docker images -q node-ssr-app:v1', returnStdout: true).trim()
            if (imageExists) {
              sh 'docker rmi node-ssr-app:v1'
            } else {
              echo 'Docker image node-ssr-app:v1 does not exist. Skipping removal.'
          }
        }
      }
    }
    stage('Build'){
      steps{
        script{
          sh 'docker compose up -d'
        }
      }
    }
  }
}