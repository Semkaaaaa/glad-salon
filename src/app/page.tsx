'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles,
  CheckCircle,
  Menu,
  X,
  Send,
  Heart,
  Shield,
  Award,
  Users,
  Zap,
  MessageCircle,
  Gift,
  Star,
  Waves
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Отправляем заявку на API
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setIsDialogOpen(false)
          setFormData({ name: '', phone: '', service: '' })
        }, 2000)
      } else {
        alert('Ошибка отправки. Попробуйте ещё раз.')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Ошибка отправки. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const advantages = [
    {
      icon: Users,
      title: '1000+ довольных клиентов',
      description: 'За год работы более 1000 клиентов доверили нам свою красоту'
    },
    {
      icon: Shield,
      title: 'Медицинское образование',
      description: 'Специалисты с медицинским образованием гарантируют безопасность'
    },
    {
      icon: Zap,
      title: 'Мощнейший аппарат',
      description: 'MBT ESTHETICIAN 3000 Вт — одна из самых мощных систем охлаждения'
    },
    {
      icon: Heart,
      title: 'Безболезненно',
      description: 'Процедура максимально комфортна благодаря системе охлаждения'
    }
  ]

  const benefits = [
    {
      icon: Star,
      title: 'Индивидуальный подход',
      description: 'Персональная программа для каждого клиента'
    },
    {
      icon: CheckCircle,
      title: 'Прозрачность цен',
      description: 'Никаких скрытых платежей и неожиданных доплат'
    },
    {
      icon: Gift,
      title: 'Лояльность и спецпредложения',
      description: 'Бонусы и скидки постоянным клиентам'
    },
    {
      icon: MessageCircle,
      title: 'Обратная связь 24/7',
      description: 'Всегда на связи в WhatsApp и Telegram'
    }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f9f9] to-[#eef5f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img 
                src="/glad-logo.jpg" 
                alt="Гладь" 
                className="h-14 w-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-[#104f4f] hover:text-[#0d3d3d] transition-colors font-medium"
              >
                О студии
              </button>
              <button 
                onClick={() => scrollToSection('advantages')}
                className="text-[#104f4f] hover:text-[#0d3d3d] transition-colors font-medium"
              >
                Преимущества
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="text-[#104f4f] hover:text-[#0d3d3d] transition-colors font-medium"
              >
                Контакты
              </button>
            </nav>

            {/* CTA Button - Right Corner */}
            <div className="flex items-center gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#104f4f] hover:bg-[#0d3d3d] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6">
                    <Phone className="w-4 h-4 mr-2" />
                    Записаться
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl border-0">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-[#104f4f]">Записаться на процедуру</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Оставьте заявку и мы свяжемся с вами в ближайшее время
                    </DialogDescription>
                  </DialogHeader>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#104f4f]">Ваше имя</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value.slice(0, 50)})}
                          placeholder="Введите ваше имя"
                          required
                          maxLength={50}
                          className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                        />
                        <p className="text-xs text-gray-400">{formData.name.length}/50 символов</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#104f4f]">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value.slice(0, 20)})}
                          placeholder="+7 (___) ___-__-__"
                          required
                          maxLength={20}
                          className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                        />
                        <p className="text-xs text-gray-400">{formData.phone.length}/20 символов</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-[#104f4f]">Зона эпиляции</Label>
                        <Input
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value.slice(0, 100)})}
                          placeholder="Например: бикини, ноги, подмышки..."
                          maxLength={100}
                          className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                        />
                        <p className="text-xs text-gray-400">{formData.service.length}/100 символов</p>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#104f4f] hover:bg-[#0d3d3d] text-white rounded-xl py-6 text-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Отправить заявку
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <CheckCircle className="w-16 h-16 text-[#104f4f] animate-bounce" />
                      <p className="text-xl font-medium text-[#104f4f]">Заявка отправлена!</p>
                      <p className="text-gray-600 text-center">Мы свяжемся с вами в ближайшее время</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 text-[#104f4f]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-[#bbcccc] pt-4">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-[#104f4f] hover:text-[#0d3d3d] transition-colors font-medium text-left"
                >
                  О студии
                </button>
                <button 
                  onClick={() => scrollToSection('advantages')}
                  className="text-[#104f4f] hover:text-[#0d3d3d] transition-colors font-medium text-left"
                >
                  Преимущества
                </button>
                <button 
                  onClick={() => scrollToSection('contacts')}
                  className="text-[#104f4f] hover:text-[#0d3d3d] transition-colors font-medium text-left"
                >
                  Контакты
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#104f4f]/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-[#104f4f]/10 text-[#104f4f] border-[#104f4f]/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Студия лазерной эпиляции
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#104f4f] mb-6 leading-tight">
                Гладкая кожа — <br />
                <span className="text-[#0d7a7a]">это просто!</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Приходите в «Гладь», и вы получите не только эффект гладкой кожи, 
                но и ощущение заботы и любви к себе!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-[#104f4f] hover:bg-[#0d3d3d] text-white rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-glow">
                      Записаться онлайн
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl border-0">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-[#104f4f]">Записаться на процедуру</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Оставьте заявку и мы свяжемся с вами
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name2" className="text-[#104f4f]">Ваше имя</Label>
                        <Input
                          id="name2"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value.slice(0, 50)})}
                          placeholder="Введите ваше имя"
                          required
                          maxLength={50}
                          className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                        />
                        <p className="text-xs text-gray-400">{formData.name.length}/50 символов</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone2" className="text-[#104f4f]">Телефон</Label>
                        <Input
                          id="phone2"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value.slice(0, 20)})}
                          placeholder="+7 (___) ___-__-__"
                          required
                          maxLength={20}
                          className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                        />
                        <p className="text-xs text-gray-400">{formData.phone.length}/20 символов</p>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#104f4f] hover:bg-[#0d3d3d] text-white rounded-xl py-6 text-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Отправить заявку
                          </>
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#104f4f] text-[#104f4f] hover:bg-[#104f4f] hover:text-white rounded-full px-8 py-6 text-lg"
                  onClick={() => scrollToSection('advantages')}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative animate-float">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#104f4f]/20 to-[#0d7a7a]/10 flex items-center justify-center shadow-2xl">
                  <div className="text-center p-8">
                    <Waves className="w-20 h-20 mx-auto text-[#104f4f] mb-4" />
                    <p className="text-2xl font-bold text-[#104f4f]">ГЛАДЬ</p>
                    <p className="text-gray-600 mt-2">Красота без усилий</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#104f4f]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#0d7a7a]/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#104f4f] mb-4">О студии</h3>
            <Separator className="w-24 mx-auto bg-[#104f4f] h-1 rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                У нас не просто студия, у нас <span className="font-semibold text-[#104f4f]">пространство</span>, 
                в котором по-настоящему комфортно!
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {advantages.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card 
                    key={index} 
                    className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-[#f5f9f9]"
                  >
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#104f4f]/10 flex items-center justify-center mb-4">
                        <IconComponent className="w-8 h-8 text-[#104f4f]" />
                      </div>
                      <CardTitle className="text-lg text-[#104f4f]">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 bg-gradient-to-r from-[#104f4f] to-[#0d5a5a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 mx-auto text-white/80 mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Сертифицированный диодный аппарат
            </h3>
            <p className="text-xl text-white/90 mb-8">
              MBT ESTHETICIAN <span className="font-bold text-white">3000 Вт</span>
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-white/90 text-lg leading-relaxed">
                Одна из самых мощных систем охлаждения, которая сделает процедуру 
                <span className="font-semibold text-white"> максимально эффективной и безболезненной!</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="advantages" className="py-20 bg-[#f5f9f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#104f4f] mb-4">Почему выбирают нас</h3>
            <Separator className="w-24 mx-auto bg-[#104f4f] h-1 rounded-full mb-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#104f4f]/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[#104f4f]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#104f4f] mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#104f4f] mb-4">
              Готовы стать увереннее?
            </h3>
            <p className="text-gray-600 mb-8">
              Запишитесь на бесплатную консультацию и получите индивидуальный план процедур
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-[#104f4f] hover:bg-[#0d3d3d] text-white rounded-full px-8 py-6 text-lg shadow-xl">
                  Записаться сейчас
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl border-0">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-[#104f4f]">Записаться на процедуру</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Оставьте заявку и мы свяжемся с вами
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name3" className="text-[#104f4f]">Ваше имя</Label>
                    <Input
                      id="name3"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value.slice(0, 50)})}
                      placeholder="Введите ваше имя"
                      required
                      maxLength={50}
                      className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                    />
                    <p className="text-xs text-gray-400">{formData.name.length}/50 символов</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone3" className="text-[#104f4f]">Телефон</Label>
                    <Input
                      id="phone3"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value.slice(0, 20)})}
                      placeholder="+7 (___) ___-__-__"
                      required
                      maxLength={20}
                      className="border-[#bbcccc] focus:border-[#104f4f] focus:ring-[#104f4f] rounded-xl"
                    />
                    <p className="text-xs text-gray-400">{formData.phone.length}/20 символов</p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#104f4f] hover:bg-[#0d3d3d] text-white rounded-xl py-6 text-lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-[#f5f9f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#104f4f] mb-4">Контакты</h3>
            <Separator className="w-24 mx-auto bg-[#104f4f] h-1 rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-[#104f4f] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#104f4f] mb-1">Адрес</h4>
                    <p className="text-gray-600">г. Ростов-на-Дону</p>
                    <p className="text-gray-600">ул. Мечникова, 146А</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-[#104f4f] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#104f4f] mb-1">Телефон</h4>
                    <a href="tel:+79934559018" className="text-gray-600 hover:text-[#104f4f] transition-colors text-lg">
                      +7 (993) 455-90-18
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Звоните или пишите в WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-[#104f4f] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#104f4f] mb-1">Обратная связь</h4>
                    <p className="text-gray-600">Доступны 24/7</p>
                    <p className="text-sm text-gray-500">Во всех мессенджерах</p>
                  </div>
                </div>

                <a 
                  href="https://max.ru/u/f9LHodD0cOJ6gSNq8sR2OQl554Qu7tRhvejt-oEfRnzz4l8jDrNFLQFvInw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl py-6 text-lg shadow-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Написать в MAX
                  </Button>
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-full min-h-[400px] bg-gradient-to-br from-[#104f4f]/5 to-[#0d7a7a]/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 mx-auto text-[#104f4f] mb-4" />
                    <p className="text-xl font-medium text-[#104f4f]">Ростов-на-Дону</p>
                    <p className="text-gray-600 mt-2">ул. Мечникова, 146А</p>
                    <a 
                      href="https://yandex.ru/maps/-/CDxZnF" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-block"
                    >
                      <Button variant="outline" className="border-[#104f4f] text-[#104f4f] hover:bg-[#104f4f] hover:text-white">
                        Открыть на карте
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#104f4f] text-white/80 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/glad-logo.jpg" 
                alt="Гладь" 
                className="h-12 w-auto rounded-lg"
              />
              <div>
                <p className="text-white font-semibold text-lg">ГЛАДЬ</p>
                <p className="text-sm text-white/60">Студия эпиляции</p>
              </div>
            </div>
            <p className="text-sm text-center text-white/60">
              © 2024 Гладь. Все права защищены.
            </p>
            <a 
              href="tel:+79934559018" 
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +7 (993) 455-90-18
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
