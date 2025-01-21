echo "Getting dependencies"
echo
node ./scripts/get-deps.mjs
chmod +x ./scripts/installdeps.sh
echo
./scripts/installdeps.sh
echo
rm ./scripts/installdeps.sh
