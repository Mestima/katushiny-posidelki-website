let protocol = 'http://';
let name = 'katusha-events.ru';
let inventory = 'inv.';

let dname = protocol+name;
let aname = protocol+inventory+name;
export default {
  login: dname+'/server/login.php',
  reg: dname+'/server/reg.php',
  convention: dname+'/server/convention.php',
  mainpage: dname+'/server/mainpage.php',
  inventory: aname+'?token=',
  neworder: dname+'/server/order.php',
  self: dname
}
