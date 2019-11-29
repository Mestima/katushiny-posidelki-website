let protocol = 'http://';
let name = 'nilored.ru';
let inventory = 'inv.';

let dname = protocol+name;
let aname = protocol+inventory+name;
export default {
  login: dname+'/login.php',
  reg: dname+'/reg.php',
  convention: dname+'/convention.php',
  mainpage: dname+'/mainpage.php',
  inventory: aname+'?token='
}
