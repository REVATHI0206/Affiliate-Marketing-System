import dns from "dns";

console.log("Servers:", dns.getServers());

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("After:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.pzwmmpc.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);