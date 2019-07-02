sudo pkill node
git reset --hard
sudo -u admin git pull
sudo npm install
sudo prisma deploy -f
sudo npm start&