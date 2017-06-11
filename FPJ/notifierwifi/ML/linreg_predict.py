import sys
import numpy as np
import pickle
from sklearn import linear_model

if len(sys.argv) != 2:
	print('Usage :', sys.argv[0], 'x')
	exit(1)

x = float(sys.argv[1])
test = np.array([[x]])

regr = pickle.load(open('linreg.model', 'rb'))
print(regr.predict(x))
