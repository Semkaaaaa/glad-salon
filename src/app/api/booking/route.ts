import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SALON_CONFIG } from '@/lib/config'

// Инициализация Resend
const resend = new Resend(process.env.RESEND_API_KEY)

interface FormData {
  name: string
  phone: string
  service?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()
    
    const { name, phone, service } = data
    
    // Валидация
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Заполните обязательные поля' },
        { status: 400 }
      )
    }

    // Формируем текст письма
    const emailSubject = `Новая заявка с сайта ${SALON_CONFIG.NAME}`
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #104f4f; margin-bottom: 20px;">🆕 Новая заявка с сайта ${SALON_CONFIG.NAME}</h2>
          <hr style="border: none; border-top: 2px solid #104f4f; margin: 20px 0;">
          <table style="width: 100%; font-size: 16px;">
            <tr>
              <td style="padding: 10px 0; color: #666; width: 120px;"><strong>Имя:</strong></td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Телефон:</strong></td>
              <td style="padding: 10px 0;">
                <a href="tel:${phone}" style="color: #104f4f; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            ${service ? `
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Услуга:</strong></td>
              <td style="padding: 10px 0;">${service}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Дата:</strong></td>
              <td style="padding: 10px 0;">${new Date().toLocaleString('ru-RU')}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            Заявка поступила с сайта ${SALON_CONFIG.NAME}
          </p>
        </div>
      </div>
    `

    // Отправка письма через Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Гладь <onboarding@resend.dev>',
      to: [SALON_CONFIG.EMAIL],
      subject: emailSubject,
      html: emailHtml,
    })

    if (error) {
      console.error('Ошибка отправки email:', error)
      return NextResponse.json(
        { success: false, error: 'Ошибка отправки email' },
        { status: 500 }
      )
    }

    console.log('========================================')
    console.log('📧 ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА')
    console.log('========================================')
    console.log(`Email: ${SALON_CONFIG.EMAIL}`)
    console.log(`Имя: ${name}`)
    console.log(`Телефон: ${phone}`)
    if (service) console.log(`Услуга: ${service}`)
    console.log(`ID письма: ${emailData?.id}`)
    console.log('========================================')

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно отправлена',
      emailId: emailData?.id 
    })

  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка отправки заявки' },
      { status: 500 }
    )
  }
}
