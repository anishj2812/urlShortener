from operator import le
from flask import Flask,redirect,jsonify, request
import mysql.connector
import urllib.parse
import string,random,socket,json
base62_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
padding_chars="-_~"
char_map = {}
for i in range(len(base62_chars)):
    char_map[base62_chars[i]] = i
connection = mysql.connector.connect(user='root',host='127.0.0.1',database='urlshortener')
db=connection.cursor()
db.execute("select max(id) from url")
results=db.fetchall()
highestUrlId=results[0][0]+1
hostname = socket.gethostname()
ip_address = socket.gethostbyname(hostname)
# print(ip_address)
ip_address = 'localhost'

# print(f"Hostname: {hostname}")
# print(f"IP Address: {ip_address}")

app = Flask(__name__)
@app.after_request
def add_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/inserturl/<path:d>')
def temp(d):
    decoded_url = urllib.parse.unquote(d)
    global highestUrlId    
    print(decoded_url,"*****")
    db.execute("insert into url values(%s,%s)",(highestUrlId,decoded_url))
    str=""
    x=highestUrlId
    count=0
    while(x>0):
        str+=base62_chars[x%62]
        x=x//62
        count+=1
    str+="-"
    count+=1
    while(count<7):
        str+=random.choice(base62_chars)
        count+=1    
    # print(str)
    highestUrlId=highestUrlId+1
    connection.commit()
    generatedURL=ip_address+":12377/"+str
    return jsonify({"generatedURL": generatedURL})

@app.route('/<s>', methods=['GET'])
def get_url(s):
    i=0
    x=0
    p=1
    # print(s)
    while(i<len(s) and ((s[i]>='a' and s[i]<='z') or (s[i]>='A' and s[i]<='Z') or (s[i]>='0' and s[i]<='9'))):
        x=x+char_map[s[i]]*p
        p=p*62
        i+=1
    # print(x)
    db.execute("select url from url where id=%s",(x,))
    result=db.fetchall()
    # print(result)
    if(result):
        actualURL=result[0][0]
        # print(actualURL)
        return redirect(actualURL, code=302)
    return jsonify({"Error":"URL not generated"})

@app.route('/', methods=['GET'])
def test():
    return jsonify({"test":"test"})
    

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=12377)
