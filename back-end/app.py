import json
import os
import datetime
import sqlite3
from flask import Flask
from flask_mysqldb import MySQL
from flask import request, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static')
app.config['MYSQL_USER'] = 'ashish'
app.config['MYSQL_PASSWORD'] = 'Pass@123'
app.config['MYSQL_DB'] = 'category'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)
CORS(app)



#initial
@app.route('/')
def showItems():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT *FROM category')
    data=cursor.fetchall()
    cursor.execute('SELECT *FROM items')
    itmdata= cursor.fetchall()
    print(itmdata)
    itm=[]
    items = []
    for item in data:
        items.append(item)
    for item in itmdata:
        itm.append(item)
    final=[[items],[itm]]
    return json.dumps(final)

@app.route('/both')
def showAllItems():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT *FROM category natural join items')
    data=cursor.fetchall()
    items = []
    for item in data:
        items.append(item)
    return json.dumps(items)
@app.route('/burger/<int:id>')    
def showCategoryItme(id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from category natural join items where cat_id= (%s) """, [id])
    data=cursor.fetchall()
    cursor.close()
    items = []
    for item in data:
        items.append(item)
    return json.dumps(items)
@app.route('/veg/<int:id>')
def getVegItems(id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from category natural join items where cat_id= (%s) and type='veg' """, [id])
    data=cursor.fetchall()
    cursor.close()
    items = []
    for item in data:
        items.append(item)
    return json.dumps(items)
@app.route('/nveg/<int:id>')
def getNVegItems(id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from category natural join items where cat_id= (%s) and type='nonveg' """, [id])
    data=cursor.fetchall()
    cursor.close()
    items = []
    for item in data:
        items.append(item)
    return json.dumps(items)
@app.route('/search/<int:id>')
def getCategoryItem(id):
    param = request.headers.get('param')
    print(param)
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from items where cat_id=(%s) and item_name like %s """,[id,('%' + param + '%')])
    data=cursor.fetchall()
    print(data)
    cursor.close()
    items = []
    for item in data:
        items.append(item)
    return json.dumps(items)






if __name__ == "__main__":
    app.run(debug = True)




