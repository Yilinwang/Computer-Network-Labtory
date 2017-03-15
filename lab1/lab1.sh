#! /bin/bash
#clean Firewall
iptables -F
iptables -X
iptables -Z

#clean NAT
iptables -t nat -F
iptables -t nat -X
iptables -t nat -Z

#Let NAT translate private ip into computerA's ip
iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o eth0 -j MASQUERADE
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

#default
iptables -P INPUT  DROP
iptables -P FORWARD DROP
iptables -P OUTPUT  DROP

#http
iptables -A FORWARD -p tcp --sport 80 -j ACCEPT
iptables -A FORWARD -p tcp --dport 80 -j ACCEPT

#DNS
iptables -A FORWARD -p udp --sport 53 -j ACCEPT
iptables -A FORWARD -p udp --dport 53 -j ACCEPT

#FTP
iptables -A FORWARD -p tcp --sport 20 -j ACCEPT
iptables -A FORWARD -p tcp --dport 20 -j ACCEPT
iptables -A FORWARD -p tcp --sport 21 -j ACCEPT
iptables -A FORWARD -p tcp --dport 21 -j ACCEPT

#Telnet
iptables -A FORWARD -p tcp --sport 23 -j ACCEPT
iptables -A FORWARD -p tcp --dport 23 -j ACCEPT

#ICMP
iptables -A FORWARD -p icmp -j ACCEPT

#SSH
iptables -A FORWARD -p tcp --sport 22 -j ACCEPT
iptables -A FORWARD -p tcp --dport 22 -j ACCEPT

#LOG
iptables -N LOGGING
iptables -A FORWARD -j LOGGING
iptables -A LOGGING -m limit --limit 1/second -j LOG --log-prefix "IPTables-Dropped: " --log-level 4
