export default function isJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (err) {
        return false;
    }
}
