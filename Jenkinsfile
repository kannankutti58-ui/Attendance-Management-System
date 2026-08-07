pipeline {
    agent any

    // Jenkins > Manage Jenkins > Tools > NodeJS installations
    // Add an installation named "node20" (or change the name below to match yours).
    tools {
        nodejs 'node20'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint / Build') {
            steps {
                // CI=true turns ESLint warnings into build failures, same as local builds.
                sh 'CI=true npm run build'
            }
        }

        stage('Package') {
            steps {
                sh '''
                    cd build
                    zip -r ../attendance-management-system-build.zip .
                '''
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'attendance-management-system-build.zip', fingerprint: true
                archiveArtifacts artifacts: 'build/**', fingerprint: false, allowEmptyArchive: false
            }
        }
    }

    post {
        success {
            echo 'Build succeeded. Download the zip from the build\'s "Build Artifacts" page and deploy it wherever you like (any static file host: nginx, Apache, S3, Netlify, etc.).'
        }
        failure {
            echo 'Build failed — check the console output above (usually a lint error or missing dependency).'
        }
        always {
            cleanWs()
        }
    }
}
