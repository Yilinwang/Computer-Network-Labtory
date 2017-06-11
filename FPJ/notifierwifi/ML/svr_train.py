import numpy as np
from sklearn.svm import SVR
import pickle

with open('train_data', 'r') as f:
	input_data = [[float(x) for x in line.lstrip().rstrip().split(' ')] for line in f]
input_data = np.array(input_data)


X = input_data[:, [2, 3, 4]]
Y = input_data[:, 0]

model = SVR()
model.fit(X, Y)
print('mean square error:', np.mean((model.predict(X)-Y)**2))

pickle.dump(model, open('svr_model_x', 'wb'))

X = input_data[:, [2, 3, 4]]
Y = input_data[:, 1]

model = SVR()
model.fit(X, Y)

pickle.dump(model, open('svr_model_y', 'wb'))
print('mean square error:', np.mean((model.predict(X)-Y)**2))
