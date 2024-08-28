pipeline {
  agent any

  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV = credentials('ENV_URL_API_PASS')
  }
    

  stages {
    stage('Copy .env files') {
      steps {
        script {
          def env = readFile(ENV)
          writeFile file: '.env', text: env
        }
      }
    }

    stage('Docker Down'){
      steps {
        sh 'docker-compose down'
      }
    }

    stage('Docker Build'){
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}