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
    
    
    stage('Clear System') {
      steps {
        sh 'docker system prune -a -f'
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
    }
    
    stage('Deploy Application') {
      steps {
        sh 'docker run --name ZooApp -p 3000:3000 $registry:$BUILD_NUMBER'
      }
    }
  }
  
  }

