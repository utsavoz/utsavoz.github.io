pipeline {
   agent any
   stages {
      stage('Build image') {
          steps {
              sh 'sudo docker build -t utsavoz/magnum_opus .'
          }
      }

      stage('Docker login') {
    	  steps {
		  withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
			sh "sudo docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"
		}
	  }
      }

      stage ('Push image'){
	  steps {
		sh "sudo docker push utsavoz/magnum_opus"
	  }
	 steps {
		sshagent(credentials : ['pranav_mac_ssh']) {
			sh "echo pwd"
			sh 'ssh -t -t root@165.22.207.218 -o StrictHostKeyChecking=no "deploy.sh"'
		}
         }
      }
}
