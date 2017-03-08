iptables -F
iptables -X
iptables -Z
iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o eth0 -j MASQUERADE
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 192.168.100.10:80
iptables -P FORWARD DROP
iptables -A FORWARD -i eth1 -p tcp --dport 80 -j ACCEPT
iptables -A FORWARD -o eth1 -p tcp --sport 80 -j ACCEPT
#iptables -A FORWARD -i eth1 -p udp --dport 80 -j ACCEPT
#iptables -A FORWARD -o eth1 -p udp --sport 80 -j ACCEPT
#iptables -A FORWARD -i eth1 -p tcp --dport 443 -j ACCEPT
#iptables -A FORWARD -o eth1 -p tcp --sport 443 -j ACCEPT
iptables -A FORWARD -i eth1 -p udp --dport 53 -j ACCEPT
iptables -A FORWARD -o eth1 -p udp --sport 53 -j ACCEPT
iptables -A FORWARD -i eth1 -p tcp --dport 22 -j ACCEPT
iptables -A FORWARD -o eth1 -p tcp --sport 22 -j ACCEPT
iptables -A FORWARD -i eth1 -p tcp --dport 21 -j ACCEPT
iptables -A FORWARD -o eth1 -p tcp --sport 21 -j ACCEPT
iptables -A FORWARD -i eth1 -p tcp --dport 20 -j ACCEPT
iptables -A FORWARD -o eth1 -p tcp --sport 20 -j ACCEPT
iptables -A FORWARD -i eth1 -p tcp --dport 23 -j ACCEPT
iptables -A FORWARD -o eth1 -p tcp --sport 23 -j ACCEPT
iptables -A FORWARD -i eth1 -p icmp -j ACCEPT
iptables -A FORWARD -o eth1 -p icmp -j ACCEPT
