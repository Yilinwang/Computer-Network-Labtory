import os
import sys
sys.path.append(os.getcwd() + '/libsvm/python')
from svmutil import *

if len(sys.argv) != 4:
	print('Usage :', sys.argv[0], 'signal_7 signal_12 signal_13')
	exit(1)

x = [{i:float(sys.argv[i]) for i in range(1, 4)}]
y = [0]

# predict coordinate x
m = svm_load_model('model_x')
p_label, p_acc, p_val = svm_predict(y, x, m, '-q')
print(p_label[0])

# predict coordinate y
m = svm_load_model('model_y')
p_label, p_acc, p_val = svm_predict(y, x, m, '-q')
print(p_label[0])

