pipeline {
  
  environment {
    registryCredential = 'DockerHub'
    registry = "teahands/zoo-application"
    dockerImage = ''
  }
  
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/JackTeahan98/DevelopmentOperations'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }
    
    stage('Building Image') {
      steps {
        script{dockerImage = docker.build registry + ":$BUILD_NUMBER"}
      }
     } 
    
    stage('Push Image to DockerHub') {
      steps {
        script{docker.withRegistry('',registryCredential){
        dockerImage.push()
        }
      }
     } 
    }}
  }

