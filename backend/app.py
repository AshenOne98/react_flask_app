from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')

# Create database
db = client['mydb']

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/users', methods=['POST', 'GET'])
def data():

    if request.method == 'POST':
        # Get data from form
        body = request.json
        name = body['name']
        phone = body['phone']

        # Insert data into database
        db.users.insert_one({
            'name': name,
            'phone': phone
        })

        return jsonify({'message': 'User created successfully!'})

    if request.method == 'GET':
        # Get data from database
        users = db.users.find()

        # Create list
        data = []

        for user in users:
            data.append({
                '_id': str(ObjectId(user['_id'])),
                'name': user['name'],
                'phone': user['phone']
            })

        return jsonify(data)

@app.route('/users/get/<id>', methods=['GET'])
def getUser(id):

    # Get data from database
    user = db.users.find_one({'_id': ObjectId(id)})

    # Create list
    data = {
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'phone': user['phone']
    }

    return jsonify(data)

@app.route('/users/update/<id>', methods=['GET', 'DELETE', 'PUT'])
def updateUser(id):

    # Get data from form
    body = request.json
    name = body['name']
    phone = body['phone']

    # Update data into database
    db.users.update_one({'_id': ObjectId(id)}, {
        '$set': {
            'name': name,
            'phone': phone
        }
    })

    return jsonify({'message': 'User updated successfully!'})

@app.route('/users/delete/<id>', methods=['DELETE'])
def deleteUser(id):

    # Delete data from database
    db.users.delete_one({'_id': ObjectId(id)})

    return jsonify({'message': 'User deleted successfully!'})

if __name__ == '__main__':
    app.run(debug=True)
    app.run()