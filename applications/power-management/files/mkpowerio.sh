GPIO24=24
echo $GPIO24 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio${GPIO24}/direction
echo 1 > /sys/class/gpio/gpio${GPIO24}/value
