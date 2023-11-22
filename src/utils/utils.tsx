export const setRandomKey = (index:number) : number=> {
    return index * Date.now()
}

export const getDayOfWeek = (dateStr: string): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  }
