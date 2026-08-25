import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { joinGiveawayList } from '@/server/giveaway.functions'

export const Route = createFileRoute('/')({
  component: RadioManiasPage,
})

const QUOTES = [
  '🎧 A música que você precisava ouvir pode estar tocando agora.',
  '❤️ Uma música. Mil lembranças.',
  '🔥 Sua vibe. Sua música. Seu momento.',
  '👀 Fica mais um pouco... a próxima pode ser a sua.',
  '🎶 Tem músicas que a gente ouve. Outras, a gente sente.',
]

function RadioManiasPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [dynamicText, setDynamicText] = useState(QUOTES[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)
  const joinGiveaway = useServerFn(joinGiveawayList)

  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i = (i + 1) % QUOTES.length
      setDynamicText(QUOTES[i])
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  function scrollToId(id: string) {
    const root = rootRef.current
    const target = root?.querySelector('#' + id)
    if (target && 'scrollIntoView' in target) {
      ;(target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function focusSection(section: string) {
    const root = rootRef.current
    const card = root?.querySelector<HTMLElement>('[data-section="' + section + '"]')
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', block: 'center' })
    card.animate?.(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.035)' }, { transform: 'scale(1)' }],
      { duration: 850, easing: 'ease-out' },
    )
    const firstAction = card.querySelector<HTMLButtonElement>('.actions button')
    if (firstAction) setTimeout(() => firstAction.focus(), 450)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail) {
      setStatus('Preencha seu nome e e-mail.')
      return
    }
    setPending(true)
    setStatus('')
    try {
      const result = await joinGiveaway({ data: { name: trimmedName, email: trimmedEmail } })
      if (result.success) {
        setStatus('Cadastro realizado! Você está na lista de sorteios da Rádio Manias.')
        setName('')
        setEmail('')
      } else {
        setStatus(result.message ?? 'Não foi possível registrar seu cadastro. Tente novamente.')
      }
    } catch {
      setStatus('Não foi possível registrar seu cadastro. Tente novamente.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div id="manias-preview" ref={rootRef}>
      <style>{PAGE_STYLES}</style>
      <div className="rainbow" aria-hidden="true"></div>
      <div className="flying-logo" aria-hidden="true">
        <span className="phones"></span>
        <span className="text">
          <small>RÁDIO</small>
          <b>MANIAS</b>
          <em>de Você</em>
        </span>
      </div>
      <header className="top">
        <div className="brand-area">
          <div className="brand">
            <div className="radio">RÁDIO</div>
            <div className="name">MANIAS</div>
            <div className="devoce">DE VOCÊ</div>
            <div className="slogan">A alegria que faz bem viver</div>
          </div>
        </div>
        <nav>
          <button type="button" onClick={() => scrollToId('home')}>
            Início
          </button>
          <button type="button" onClick={() => scrollToId('prog')}>
            Programação
          </button>
          <button type="button" onClick={() => scrollToId('radio')}>
            A Rádio
          </button>
          <button type="button" onClick={() => scrollToId('community')}>
            Comunidade
          </button>
          <button type="button" onClick={() => scrollToId('contact')}>
            Contato
          </button>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow">RÁDIO ONLINE · TOCANDO SUAS MANIAS</div>
        <h1>A música entra em cena.</h1>
        <p className="hero-copy">
          Sua música, sua história, seu lugar. Entre, fique à vontade e sinta-se em casa.
        </p>
        <div className="dynamic">{dynamicText}</div>
        <div className="player">
          <iframe
            src="https://player.srvsh.com.br/player-web/8040"
            frameBorder={0}
            width="100%"
            height={465}
            title="Player da Rádio Manias de Você"
            allow="autoplay"
          ></iframe>
        </div>
        <div className="time">
          <div className="time-grid">
            <div className="time-card">
              <div className="time-icon">◷</div>
              <small>PASSADO</small>
              <h3>Uma música volta.</h3>
              <p className="muted">
                O som acende memórias como se alguns minutos nunca tivessem passado.
              </p>
            </div>
            <div className="time-card">
              <div className="time-icon">∞</div>
              <small>PRESENTE</small>
              <h3>Agora dura mais.</h3>
              <p className="muted">
                O instante vira experiência e o relógio parece perder a pressa.
              </p>
            </div>
            <div className="time-card">
              <div className="time-icon">◇</div>
              <small>FUTURO</small>
              <h3>A próxima já chama.</h3>
              <p className="muted">A música seguinte chega como um eco vindo de amanhã.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="prog">
        <div className="section-head">
          <small>NO AR</small>
          <h2>Escolha seu momento. A rádio acompanha você.</h2>
          <p className="muted">
            Da primeira música da manhã ao fim do dia, sempre existe um clima esperando por você
            na Manias.
          </p>
        </div>
        <div className="grid">
          <div className="card">
            <small>COMECE LEVE</small>
            <b>Bom Dia, Manias</b>
            <p className="muted">
              A trilha certa para abrir o dia com energia e vontade de ficar mais um pouco.
            </p>
          </div>
          <div className="card">
            <small>SUCESSOS QUE PRENDEM</small>
            <b>Manhã de Sucessos</b>
            <p className="muted">
              Hits e clássicos escolhidos para despertar memória, curiosidade e aquela sensação de
              “só mais uma música”.
            </p>
          </div>
          <div className="card">
            <small>PAUSA QUE FAZ BEM</small>
            <b>Conexão Manias</b>
            <p className="muted">
              Boa companhia no almoço, com músicas que transformam alguns minutos em um momento
              seu.
            </p>
          </div>
          <div className="card">
            <small>FIM DE TARDE COM HISTÓRIA</small>
            <b>Tarde Manias</b>
            <p className="muted">
              Pedidos, participação e surpresas para você não apenas ouvir a rádio — mas fazer
              parte dela.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="radio">
        <div className="section-head">
          <small>A RÁDIO</small>
          <h2>Rádio Manias de Você: música que faz bem viver.</h2>
          <p className="muted">
            Música também é encontro. Um espaço para aproximar famílias, valorizar histórias,
            acolher gerações e fazer cada pessoa sentir que tem lugar nessa sintonia.
          </p>
        </div>
        <div className="grid">
          <div className="card">
            <b>🎧 Música boa o dia inteiro</b>
            <p className="muted">Seleção para cada momento.</p>
          </div>
          <div className="card">
            <b>📻 Programas ao vivo</b>
            <p className="muted">Pedidos, sorteios e participação.</p>
          </div>
          <div className="card">
            <b>👨‍👩‍👧‍👦 Uma rádio para a família</b>
            <p className="muted">Momentos para todas as gerações.</p>
          </div>
          <div className="card">
            <b>❤️ Aqui você faz parte</b>
            <p className="muted">Sua voz, sua história e sua música.</p>
          </div>
        </div>
      </section>

      <section className="section" id="community">
        <div className="section-head">
          <small>PRAÇA MANIAS</small>
          <h2>Um lugar para ouvir, conversar e se sentir em casa.</h2>
        </div>
        <div className="community">
          <p className="muted">
            Crianças, jovens, pais, mães, avós, empresários e famílias inteiras encontram aqui um
            ponto de encontro em torno da música.
          </p>
          <div className="community-tags">
            <button className="tag" type="button" onClick={() => focusSection('criancas')}>
              👶 Crianças
            </button>
            <button className="tag" type="button" onClick={() => focusSection('pais')}>
              👨‍👩‍👧 Pais e mães
            </button>
            <button className="tag" type="button" onClick={() => focusSection('avos')}>
              👴 Avós
            </button>
            <button className="tag" type="button" onClick={() => focusSection('empresarios')}>
              💼 Empresários
            </button>
            <button className="tag" type="button" onClick={() => focusSection('artistas')}>
              🎤 Artistas
            </button>
            <button className="tag" type="button" onClick={() => focusSection('historias')}>
              🌟 Histórias
            </button>
          </div>
        </div>
        <div className="interviews">
          <div className="interview" data-section="criancas">
            <div className="ico">👶🎙️</div>
            <h3>Crianças</h3>
            <p className="muted">Talentos, curiosidades e histórias.</p>
            <div className="actions">
              <button type="button">▶ Vídeo</button>
              <button type="button">🎧 Áudio</button>
            </div>
          </div>
          <div className="interview" data-section="pais">
            <div className="ico">👨‍👩‍👧🎙️</div>
            <h3>Pais e mães</h3>
            <p className="muted">Família, educação e vida real.</p>
            <div className="actions">
              <button type="button">▶ Vídeo</button>
              <button type="button">🎧 Áudio</button>
            </div>
          </div>
          <div className="interview" data-section="avos">
            <div className="ico">👴🎙️</div>
            <h3>Avós</h3>
            <p className="muted">Memórias que atravessam gerações.</p>
            <div className="actions">
              <button type="button">▶ Vídeo</button>
              <button type="button">🎧 Áudio</button>
            </div>
          </div>
          <div className="interview" data-section="empresarios">
            <div className="ico">💼🎙️</div>
            <h3>Empresários</h3>
            <p className="muted">Negócios, futuro e trajetórias.</p>
            <div className="actions">
              <button type="button">▶ Vídeo</button>
              <button type="button">🎧 Áudio</button>
            </div>
          </div>
          <div className="interview" data-section="artistas">
            <div className="ico">🎤✨</div>
            <h3>Artistas</h3>
            <p className="muted">Música, cultura e bastidores.</p>
            <div className="actions">
              <button type="button">▶ Vídeo</button>
              <button type="button">🎧 Áudio</button>
            </div>
          </div>
          <div className="interview" data-section="historias">
            <div className="ico">🌟🎧</div>
            <h3>História: a sua pode estar aqui.</h3>
            <p className="muted">Conte experiências, conquistas e sonhos.</p>
            <div className="actions">
              <button type="button">▶ Vídeo</button>
              <button type="button">🎧 Áudio</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-head">
          <small>CLUBE DE SORTEIOS MANIAS</small>
          <h2>Seu e-mail pode ser o primeiro passo para uma surpresa.</h2>
        </div>
        <div className="vip">
          <div>
            <h3>Entre na lista dos futuros sorteios da Rádio Manias de Você.</h3>
            <p className="muted">
              Deixe seu nome e e-mail para receber avisos sobre futuros sorteios, ações especiais,
              brindes, convites e novidades da rádio. Se você for contemplado em um sorteio,
              entraremos em contato somente pelo e-mail informado no cadastro. Nosso e-mail
              oficial para esse contato é exemplarqualidadecomercial@gmail.com.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como podemos chamar você?"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Digite seu melhor e-mail"
              required
            />
            <button type="submit" disabled={pending}>
              {pending ? 'Enviando...' : '🎁 QUERO ENTRAR NA LISTA DE SORTEIOS'}
            </button>
            <div className="vip-status" aria-live="polite">
              {status}
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <small>PAINEL INTEGRADO</small>
          <h2>Painel de controle</h2>
          <p className="muted">A prévia da interface administrativa do projeto.</p>
        </div>
        <div className="admin">
          <div className="admin-top">
            <strong>Manias Admin</strong>
            <span>Fladmir · Administrador</span>
          </div>
          <div className="admin-body">
            <div className="admin-menu">
              <button type="button">⌂ Visão geral</button>
              <button type="button">✦ Conteúdo</button>
              <button type="button">◷ Programação</button>
              <button type="button">⚙ Configurações</button>
            </div>
            <div className="admin-main">
              <div className="stats">
                <div className="stat">
                  <small>Status</small>
                  <div>🔴 Rádio no ar</div>
                </div>
                <div className="stat">
                  <small>Próxima atração</small>
                  <div>06:00</div>
                </div>
                <div className="stat">
                  <small>Painel</small>
                  <div>Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <strong>♪ Rádio Manias de Você</strong>
        <span>A alegria que faz bem viver.</span>
      </footer>
    </div>
  )
}

const PAGE_STYLES = `
#manias-preview{min-height:900px;overflow:hidden;background:radial-gradient(circle at 48% 8%,rgba(255,170,50,.16),transparent 25%),radial-gradient(circle at 80% 22%,rgba(174,52,255,.16),transparent 28%),linear-gradient(145deg,#08070a,#211a20 42%,#0c090d);color:#fff;font-family:Arial,Helvetica,sans-serif;position:relative}
#manias-preview *{box-sizing:border-box}
#manias-preview .rainbow{position:absolute;inset:0;pointer-events:none;opacity:.6;background-image:radial-gradient(circle,#ff536f 0 1.4px,transparent 2px),radial-gradient(circle,#ffac40 0 1.4px,transparent 2px),radial-gradient(circle,#ffe164 0 1.4px,transparent 2px),radial-gradient(circle,#4be481 0 1.4px,transparent 2px),radial-gradient(circle,#42c9ff 0 1.4px,transparent 2px),radial-gradient(circle,#8e70ff 0 1.4px,transparent 2px),radial-gradient(circle,#df70ff 0 1.4px,transparent 2px);background-size:71px 71px,93px 93px,107px 107px,83px 83px,101px 101px,89px 89px,119px 119px;animation:danceDots 22s ease-in-out infinite;z-index:0}
@keyframes danceDots{0%{background-position:4px 8px,35px 22px,12px 48px,62px 13px,25px 64px,78px 31px,41px 92px}25%{background-position:39px 19px,12px 58px,63px 13px,25px 70px,72px 37px,28px 85px,94px 21px}50%{background-position:15px 73px,86px 24px,37px 92px,72px 31px,19px 20px,93px 68px,31px 42px}75%{background-position:79px 39px,44px 84px,9px 28px,93px 67px,61px 11px,18px 49px,82px 89px}100%{background-position:4px 8px,35px 22px,12px 48px,62px 13px,25px 64px,78px 31px,41px 92px}}
#manias-preview .top{position:relative;z-index:3;padding:34px 5% 24px;border-top:3px double rgba(255,216,139,.26);border-bottom:1px solid rgba(255,222,158,.25);background:rgba(12,9,11,.82);backdrop-filter:blur(12px)}
#manias-preview .brand-area{display:flex;justify-content:center;align-items:center;min-height:155px}
#manias-preview .brand{position:relative;width:min(440px,92%);text-align:center;animation:brandFloat 5.5s ease-in-out infinite}
#manias-preview .brand .radio{font-family:Georgia,serif;letter-spacing:.38em;font-size:13px;color:#ffe9ae;margin-bottom:3px}
#manias-preview .brand .name{font-family:Georgia,'Times New Roman',serif;font-size:clamp(44px,7vw,78px);font-weight:900;letter-spacing:.045em;line-height:.82;color:#ff8a16;-webkit-text-stroke:.55px #ffd77d;text-shadow:0 0 4px #ffe7a8,0 0 12px rgba(255,126,13,.85),0 0 28px rgba(255,73,0,.48)}
#manias-preview .brand .devoce{font-family:Georgia,serif;font-size:clamp(19px,3vw,29px);font-weight:800;letter-spacing:.21em;color:#ffbb42;text-shadow:0 0 8px rgba(255,119,15,.55)}
#manias-preview .brand .slogan{margin-top:20px;font-family:Georgia,serif;font-size:clamp(20px,2.7vw,31px);font-style:italic;color:#f2ca74;letter-spacing:.025em}
@keyframes brandFloat{0%,100%{transform:translate(20px,5px) rotate(-1deg)}50%{transform:translate(38px,16px) rotate(1deg)}}
#manias-preview .flying-logo{position:fixed;z-index:30;left:4vw;top:8vh;width:150px;height:126px;pointer-events:none;animation:flyAllSite 40s ease-in-out infinite alternate;filter:drop-shadow(0 0 12px rgba(255,185,50,.45)) drop-shadow(0 0 22px rgba(174,55,255,.24));will-change:transform}
#manias-preview .flying-logo:before{content:"";position:absolute;inset:0;border-radius:28px;background:radial-gradient(circle at 50% 42%,rgba(255,203,70,.2),transparent 34%),radial-gradient(circle at 22% 58%,rgba(211,56,255,.2),transparent 44%),radial-gradient(circle at 80% 45%,rgba(70,181,255,.18),transparent 44%);border:1px solid rgba(255,212,104,.28);box-shadow:0 0 18px rgba(255,174,38,.2),0 0 28px rgba(181,67,255,.16)}
#manias-preview .flying-logo .phones{position:absolute;left:50%;top:10px;width:114px;height:72px;transform:translateX(-50%);border:7px solid #d8a44b;border-bottom:0;border-radius:62px 62px 22px 22px}
#manias-preview .flying-logo .phones:before,#manias-preview .flying-logo .phones:after{content:"";position:absolute;top:31px;width:24px;height:38px;border-radius:13px;background:linear-gradient(145deg,#f1c36c,#a86620 55%,#171008 85%);border:2px solid #d9a64f}
#manias-preview .flying-logo .phones:before{left:-15px}#manias-preview .flying-logo .phones:after{right:-15px}
#manias-preview .flying-logo .text{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateY(7px);text-shadow:0 2px 0 #5b350f,0 0 6px rgba(255,225,150,.22)}
#manias-preview .flying-logo small{font-size:8px;letter-spacing:.32em;color:#f7d97f;font-weight:900;margin-bottom:1px}
#manias-preview .flying-logo b{font-family:Arial Black,Impact,sans-serif;font-size:29px;letter-spacing:-.06em;color:#efb84c;line-height:.9}
#manias-preview .flying-logo em{font-family:"Brush Script MT","Segoe Script",cursive;font-size:27px;color:#efbd56;font-style:italic;font-weight:700;line-height:.9;white-space:nowrap}
@keyframes flyAllSite{0%{transform:translate3d(0,0,0) rotate(-3deg) scale(.95)}14%{transform:translate3d(55vw,10vh,0) rotate(4deg) scale(1)}28%{transform:translate3d(18vw,28vh,0) rotate(-4deg) scale(.97)}42%{transform:translate3d(64vw,42vh,0) rotate(3deg) scale(1.02)}57%{transform:translate3d(10vw,58vh,0) rotate(-3deg) scale(.98)}72%{transform:translate3d(58vw,72vh,0) rotate(3deg) scale(1)}86%{transform:translate3d(24vw,84vh,0) rotate(-2deg) scale(.97)}100%{transform:translate3d(62vw,90vh,0) rotate(2deg) scale(1)}}
#manias-preview nav{display:flex;justify-content:center;gap:4px;flex-wrap:wrap;margin-top:18px}
#manias-preview nav button{min-height:44px;border:1px solid rgba(255,220,150,.13);background:rgba(255,255,255,.025);color:#fff;padding:10px 18px;font-family:Georgia,serif;font-weight:700;cursor:pointer}
#manias-preview nav button:hover{background:rgba(255,174,52,.09);color:#ffd77f}
#manias-preview .hero{position:relative;z-index:2;padding:60px 6% 52px;text-align:center;background:radial-gradient(circle at 20% 38%,rgba(255,184,70,.12),transparent 22%),radial-gradient(circle at 80% 46%,rgba(170,74,224,.14),transparent 25%)}
#manias-preview .eyebrow{font-size:12px;letter-spacing:.27em;color:#ffd57d;font-weight:900}
#manias-preview h1{font-family:Georgia,serif;font-size:clamp(42px,7vw,75px);line-height:1.02;margin:15px 0 18px;color:#fff7e8;text-shadow:0 6px 30px #000}
#manias-preview .hero-copy{max-width:760px;margin:0 auto 28px;font-size:20px;line-height:1.65;color:#f2edf2}
#manias-preview .dynamic{font-family:Georgia,serif;font-size:clamp(21px,3vw,32px);color:#ffd77d;font-weight:700;margin:0 auto 30px;max-width:900px}
#manias-preview .player{max-width:820px;margin:auto;padding:26px;border:1px solid rgba(255,215,134,.42);border-radius:28px;background:linear-gradient(145deg,rgba(42,37,48,.96),rgba(6,8,12,.96));box-shadow:0 30px 70px rgba(0,0,0,.55),0 0 45px rgba(181,78,255,.14)}
#manias-preview .time{max-width:1080px;margin:36px auto 0;padding:23px;border:1px solid rgba(224,182,99,.28);border-radius:22px;background:rgba(13,10,17,.55)}
#manias-preview .time-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.time-card{padding:22px;border-radius:18px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(160deg,#17121b,#28152d);min-height:220px}.time-icon{font-size:62px;color:#e1b65c;margin-bottom:28px}.time-card h3{font-family:Georgia,serif;font-size:25px;margin:8px 0}
#manias-preview .section{position:relative;z-index:2;padding:55px 6%;border-top:1px solid rgba(255,255,255,.07)}
#manias-preview .section-head{max-width:1080px;margin:0 auto 28px;padding-bottom:14px;border-bottom:1px solid rgba(255,218,148,.22)}
#manias-preview .section-head small{color:#ffd57d;letter-spacing:.23em;font-weight:900}
#manias-preview h2{font-family:Georgia,serif;font-size:clamp(34px,5vw,50px);margin:9px 0;color:#fff8ea}
#manias-preview .grid{max-width:1080px;margin:auto;display:flex;flex-wrap:wrap;justify-content:center;gap:15px}
#manias-preview .grid .card{flex:1 1 240px;max-width:520px}
#manias-preview .card{padding:24px;border:1px solid rgba(255,219,149,.2);background:linear-gradient(150deg,rgba(255,249,235,.065),rgba(116,63,135,.04));border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,.18)}
#manias-preview .card b{display:block;font-family:Georgia,serif;font-size:21px;margin:9px 0}.card small{color:#e9b963}
#manias-preview .community{max-width:1080px;margin:auto;padding:29px;border:1px solid rgba(255,216,137,.28);border-radius:22px;background:linear-gradient(145deg,rgba(255,244,222,.07),rgba(130,72,146,.04))}
#manias-preview .community-tags{display:flex;gap:9px;justify-content:center;flex-wrap:wrap;margin-top:20px}.tag{padding:10px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:linear-gradient(135deg,rgba(255,178,58,.08),rgba(152,72,255,.08));font-weight:900;font-size:13px;color:#fff;cursor:pointer;transition:.22s ease}.tag:hover,.tag:focus-visible{transform:translateY(-2px) scale(1.03);border-color:rgba(255,219,133,.42);box-shadow:0 8px 22px rgba(0,0,0,.24),0 0 18px rgba(255,183,67,.12)}
#manias-preview .interviews{max-width:1080px;margin:28px auto 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.interview{padding:20px;border:1px solid rgba(255,255,255,.11);border-radius:16px;background:#120f16}.interview .ico{font-size:24px}.interview h3{font-family:Georgia,serif;margin:10px 0 6px}.actions{display:flex;gap:8px;margin-top:14px}.actions button{border:1px solid rgba(255,216,130,.22);border-radius:999px;background:rgba(255,255,255,.045);color:#fff;padding:9px 12px}
#manias-preview .vip{max-width:1080px;margin:30px auto 0;padding:34px;border-radius:28px;border:1px solid rgba(255,216,132,.34);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:28px;background:radial-gradient(circle at 14% 24%,rgba(255,197,94,.14),transparent 28%),radial-gradient(circle at 88% 26%,rgba(188,83,255,.12),transparent 30%),linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.018));box-shadow:0 26px 70px rgba(0,0,0,.32),0 0 34px rgba(255,180,57,.07)}.vip>div{flex:1 1 360px}.vip h3{font-family:Georgia,serif;font-size:clamp(34px,4vw,48px);margin:8px 0 12px;color:#fff4de}.vip form{flex:1 1 320px;display:grid;gap:12px;padding:18px;border-radius:20px;background:rgba(10,8,13,.62);border:1px solid rgba(255,255,255,.08)}.vip input{width:100%;padding:15px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.15);background:#0c0b10;color:#fff;font-size:16px}.vip button{padding:16px 22px;border-radius:999px;border:1px solid #ffe08c;background:linear-gradient(135deg,#ffb52f,#ff7a1a 50%,#e6b85b);color:#211008;font-weight:1000;letter-spacing:.03em;cursor:pointer;box-shadow:0 10px 30px rgba(255,137,33,.24),0 0 22px rgba(255,190,80,.14);animation:vipPulse 2.8s ease-in-out infinite}.vip-status{min-height:22px;color:#ffe09a;font-weight:700}@keyframes vipPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
#manias-preview .admin{max-width:1080px;margin:auto;border:1px solid rgba(239,196,112,.24);border-radius:24px;overflow:hidden;background:#100d14}.admin-top{padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;gap:15px;align-items:center}.admin-body{display:grid;grid-template-columns:210px 1fr}.admin-menu{padding:18px;background:rgba(255,255,255,.025);display:grid;align-content:start;gap:8px}.admin-menu button{padding:12px;border-radius:12px;border:0;background:transparent;color:#ddd;text-align:left}.admin-menu button:first-child{background:rgba(255,174,61,.09);color:#fff}.admin-main{padding:24px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.stat{padding:16px;border-radius:15px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.025)}
#manias-preview footer{position:relative;z-index:2;padding:32px 6%;border-top:3px double rgba(255,220,150,.16);display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;color:#d9d1dc;font-family:Georgia,serif}
#manias-preview .album{width:112px;height:112px;flex:0 0 auto;border-radius:24px;display:grid;place-items:center;background:radial-gradient(circle at 50% 42%,#ffba42,#7f3c1a 30%,#170b10 68%);border:2px solid #d99c36;box-shadow:0 0 28px rgba(255,160,42,.28);font-family:Georgia,serif;font-size:38px;font-weight:900;color:#ffd677}
@media(max-width:760px){#manias-preview .brand .name{font-size:46px}#manias-preview .grid,#manias-preview .time-grid,#manias-preview .interviews,#manias-preview .vip,#manias-preview .admin-body,#manias-preview .stats{grid-template-columns:1fr}#manias-preview .player-top{align-items:flex-start}.album{width:90px!important;height:90px!important}#manias-preview .admin-menu{grid-template-columns:1fr 1fr}}
@media(prefers-reduced-motion:reduce){#manias-preview .rainbow,#manias-preview .brand{animation:none}}
`
