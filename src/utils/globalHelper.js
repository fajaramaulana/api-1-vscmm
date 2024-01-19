const { format } = require('date-fns')
const { id } = require('date-fns/locale')
exports.parseDateFormatPublish = (date) => {
  const currentDate = new Date(date)

  const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss', { locale: id })
  return formattedCurrentDate
}
