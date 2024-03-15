# Adri-KM
### ***Work in Progress ...***
### AI based Knowledge Management Speech Analyzer
<img width="1760" alt="WorkFlow" src="https://github.com/farshin-code/adriKM/assets/76722711/79c25c6e-0c08-42f9-a78d-c5fbda5d9acc">




App Structure:

 - **Node.js Server** : Simple Node.js server with two routes (APIs) :
	 1)  /getToken : provides JWT token for authorized users.
	 2) /trigger : producer for Kafka. 
 - **kafkaPY** :  Kafka consumer, For each messages it send a request to sentiment API.
 - **ML Server** : ***Flask*** app which provides one API:
	 1) /sentiment: send grabbed speeches to SPACY NLP PIPE  "spacytextblob" , get the result of sentiment analysis back and write it to MSSQL database.
 - **Client** : React JavaScript App for client side. It also uses google Firebase to provide GOOGLE AUTH service. It also sends request to elasticsearch server for searching.  
 Components :
 - **SQL Server**
 - **Firebase**
 - **Kafka**
 - **Elasticsearch , Logstash**
 - **Genkins**
 

 
