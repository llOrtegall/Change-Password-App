pipeline {
  agent any

  tools {
    nodejs 'node-v22'
  }

  stages {
    
    stage('Install Dependencies && Build') {
      steps {
        sh 'yarn'
        sh 'yarn build'
      }
    }

    stage('Docker Down'){
      steps {
        sh 'docker compose down'
      }
    }

    stage('Docker Build'){
      steps {
        sh 'docker compose up -d'
      }
    }
  }
}