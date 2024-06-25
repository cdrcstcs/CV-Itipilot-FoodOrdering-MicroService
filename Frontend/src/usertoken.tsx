export function getCookie(name: string): string | null {
    const cookieRegex = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)');
    const cookieMatch = document.cookie.match(cookieRegex);
    if (cookieMatch) {
        return decodeURIComponent(cookieMatch[3]);
    } else {
        return null;
    }
}
  