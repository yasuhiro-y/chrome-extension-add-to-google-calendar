chrome.contextMenus.create({
  title: 'Add to Google Calendar',
  type: 'normal',
  contexts: ['all'],
  onclick: (info, tab) => {
    handleClick(info, tab)
  },
})

const handleClick = (
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab
) => {
  const pageTitle = tab.title
  const { url } = tab
  const { selectionText } = info
  const eventTitle = selectionText || pageTitle
  const generatedUrl = addToGoogleCalendarUrl(eventTitle, url)
  chrome.tabs.create({
    url: generatedUrl,
  })
}

const addToGoogleCalendarUrl = (eventTitle?: string, webUrl?: string) => {
  const tomorrow = new Date(Date.now() * 60 * 60 * 1000)
  const param = {
    text: eventTitle,
    details: '',
    location: webUrl,
    dates: {
      start:
        tomorrow.getFullYear() +
        '' +
        ('0' + (tomorrow.getMonth() + 1)).slice(-2) +
        ('0' + tomorrow.getDate()).slice(-2) +
        'T080000',
      end:
        tomorrow.getFullYear() +
        '' +
        ('0' + (tomorrow.getMonth() + 1)).slice(-2) +
        ('0' + tomorrow.getDate()).slice(-2) +
        'T080500',
    },
  }
  let url = 'http://www.google.com/calendar/event?action=TEMPLATE'
  url += '&text=' + param.text
  url += '&details=' + param.details
  url += '&location=' + param.location
  url += '&dates=' + param.dates.start + '/' + param.dates.end
  return url
}
