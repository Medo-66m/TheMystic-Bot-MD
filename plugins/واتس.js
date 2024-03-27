import moment from 'moment-timezone'
import PhoneNum from 'awesome-phonenumber'

let regionNames = new Intl.DisplayNames(['ar'], { type: 'region' })

let handler = async (m, { conn, text, usedPrefix, command: cmd }) => {
	let num = m.quoted?.sender || m.mentionedJid?.[0] || text
	if (!num) throw `*❐↞┇مـثـال 🔱↞ ${usedPrefix + cmd} منشن ┇*`
	num = num.replace(/\D/g, '') + '@s.whatsapp.net'
	if (!(await conn.onWhatsApp(num))[0]?.exists) throw '⛔ المستخدم غير موجود'
	let img = await conn.profilePictureUrl(num, 'image').catch(_ => './src/avatar_contact.png')
	let bio = await conn.fetchStatus(num).catch(_ => { })
	let name = await conn.getName(num)
	let business = await conn.getBusinessProfile(num)
	let format = PhoneNum(`+${num.split('@')[0]}`)
	let country = regionNames.of(format.getRegionCode('international'))
	let wea = `*༺━─━─╃⌬〔🐉〕⌬╄─━─━༻*\n*『🌟┇بـروفـايـل واتـسـك┇🌟』*\n*✠ ━━ • ━ ‹✤› ━ • ━━ ✠* \n*❐↞┇الاسـم🪪↞${name ? name : '-'}┇*\n*❐↞┇الرقـم🪀↞${format.getNumber('international')}┇*\n*❐↞┇الـرابـط🖇️↞ wa.me/${num.split('@')[0]} ┇*\n*❐↞┇الـمـنـشـن🔖↞@${num.split('@')[0]}┇*\n*❐↞┇الـبـايـو🎴↞${bio?.status || 'مـخـفـي'}┇*\n*❐↞┇تـاريـخ الـبـايـو⌛↞${bio?.setAt ? moment(bio.setAt.toDateString()).locale('id').format('LL') : 'مـخـفـي'}┇*\n\n${business ? `*༺━─━─╃⌬〔🐉〕⌬╄─━─━༻*『🌟┇الـبـيـزنـيـس┇🌟』*\n*✠ ━━ • ━ ‹✤› ━ • ━━ ✠* *❐↞┇الـمـعـرف🌀↞${business.wid}┇*\n*❐↞┇الايـمـيـل↞${business.website ? business.website : '-'}┇*\n*❐↞┇الايـمـيـل2📧↞${business.email ? business.email : '-'}┇*\n*❐↞┇الـفـئـه♟️↞${business.category}┇*\n*❐↞┇الـمـوقـع🧩↞${business.address ? business.address : '-'}┇*\n*❐↞┇الـوصـف⚜️↞${business.description ? business.description : '-'}` : '*❐↞┇واتـسـك🌐 ↞ عـادي┇*'}\n*༺━─━─╃⌬〔🐉〕⌬╄─━─━༻*\n*𝙱𝚈┇𝙼𝙴𝙳𝙾 𝙱𝙾𝚃*`
	img ? await conn.sendMessage(m.chat, { image: { url: img }, caption: wea, mentions: [num] }, { quoted: m }) : m.reply(wea)
}

handler.help = ['wastalk']
handler.tags = ['tools']
handler.command = /^(واتسك|الحساب|حساب|واتس)$/i

export default handler
