import sys
sys.path.append('libsvm/python')
from svmutil import *

if len(sys.argv) != 5:
	print('Usage :', sys.argv[0], 'model signal_7 signal_12 signal_13')
	exit(1)

x = [{i-1:float(sys.argv[i]) for i in range(2, 5)}]
y = [0]

m = svm_load_model(sys.argv[1])
p_label, p_acc, p_val = svm_predict(y, x, m, '-q')
print(p_label[0])
