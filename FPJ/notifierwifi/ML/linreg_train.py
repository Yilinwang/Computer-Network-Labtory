import numpy as np
from sklearn import linear_model
import pickle

X = np.array([1, 2, 5])
Y = np.array([1, 2.2, 4.9])
test = np.array([2, 3, 4])


X = X.reshape(-1, 1)
Y = Y.reshape(-1, 1)
test = test.reshape(-1, 1)

print(X)
print(Y)
print('')

regr = linear_model.LinearRegression()
regr.fit(X, Y)
print(regr.predict(test))
print(regr.get_params())

pickle.dump(regr, open('linreg.model', 'wb'))
