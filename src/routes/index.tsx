import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { joinGiveawayList } from '@/server/giveaway.functions'

export const Route = createFileRoute('/')({
  component: RadioManiasPage,
})

/*
  Tik Picke incorporado dentro do próprio arquivo.
  Assim o mascote não depende de outro arquivo para aparecer.
*/
const TIK_PICKE =
  'data:image/webp;base64,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'

const CARDS = [
  {
    title: 'CRIANÇAS',
    text: 'Diversão, música e alegria para os pequenos.',
    icon: '🎵',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=80',
    color: '#ffad00',
  },
  {
    title: 'PAIS E MÃES',
    text: 'Companhia para todos os momentos da família.',
    icon: '❤',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80',
    color: '#18e567',
  },
  {
    title: 'AVÓS',
    text: 'Canções e memórias que atravessam gerações.',
    icon: '♡',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    color: '#12baff',
  },
  {
    title: 'EMPRESÁRIOS',
    text: 'Inspiração, histórias e boas conexões.',
    icon: '↗',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80',
    color: '#bd4cff',
  },
  {
    title: 'ARTISTAS',
    text: 'Talentos, cultura e bastidores da música.',
    icon: '★',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=80',
    color: '#ff269e',
  },
  {
    title: 'HISTÓRIAS',
    text: 'A sua história também pode ganhar voz.',
    icon: '✦',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80',
    color: '#ffbd00',
  },
]

function RadioManiasPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)

  const joinGiveaway = useServerFn(joinGiveawayList)

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanWhatsapp = whatsapp.trim()

    if (!cleanName || !cleanEmail) {
      setStatus('Preencha seu nome e seu melhor e-mail.')
      return
    }

    setPending(true)
    setStatus('')

    try {
      /*
        O backend atual recebe nome e e-mail.
        Para não precisar alterar outro arquivo, o WhatsApp opcional
        é guardado junto ao nome quando preenchido.
      */
      const nameForRegistration = cleanWhatsapp
        ? `${cleanName} | WhatsApp: ${cleanWhatsapp}`
        : cleanName

      const result = await joinGiveaway({
        data: {
          name: nameForRegistration,
          email: cleanEmail,
        },
      })

      if (result.success) {
        setStatus('Cadastro realizado! Boa sorte nos futuros sorteios da Rádio Manias de Você.')
        setName('')
        setEmail('')
        setWhatsapp('')
      } else {
        setStatus(result.message ?? 'Não foi possível realizar o cadastro. Tente novamente.')
      }
    } catch {
      setStatus('Não foi possível realizar o cadastro agora. Tente novamente.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div id="radio-manias">
      <style>{PAGE_STYLES}</style>

      <div className="stars" aria-hidden="true" />

      {/* ÚNICO MASCOTE DO SITE */}
      <div className="floating-mascot" aria-label="Tik Picke, mascote da Rádio Manias de Você">
        <div className="mascot-frame">
          <img src={TIK_PICKE} alt="Tik Picke" />
          <span className="brown-shirt-tint" aria-hidden="true" />
        </div>
      </div>

      <header className="nav-bar">
        <button onClick={() => scrollTo('inicio')}>
          <span>⌂</span>
          INÍCIO
        </button>

        <button onClick={() => scrollTo('programacao')}>
          <span>▦</span>
          PROGRAMAÇÃO
        </button>

        <button onClick={() => scrollTo('radio')}>
          <span>●</span>
          A RÁDIO
        </button>

        <button onClick={() => scrollTo('comunidade')}>
          <span>♟</span>
          COMUNIDADE
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          {/* REFLETORES */}
          <div className="spotlights" aria-hidden="true">
            <div className="spot spot-green">
              <div className="mount" />
              <div className="spot-body">
                <div className="gold-ring" />
                <div className="lens" />
              </div>
              <div className="beam" />
            </div>

            <div className="spot spot-white">
              <div className="mount" />
              <div className="spot-body">
                <div className="gold-ring" />
                <div className="lens" />
              </div>
              <div className="beam" />
            </div>

            <div className="spot spot-yellow">
              <div className="mount" />
              <div className="spot-body">
                <div className="gold-ring" />
                <div className="lens" />
              </div>
              <div className="beam" />
            </div>

            <div className="spot spot-pink">
              <div className="mount" />
              <div className="spot-body">
                <div className="gold-ring" />
                <div className="lens" />
              </div>
              <div className="beam" />
            </div>
          </div>

          <div className="hero-copy-left">
            <small>RÁDIO ONLINE • 24 HORAS COM VOCÊ</small>

            <p>
              Músicas que tocam, companhia que acolhe e paixão que conecta!
            </p>

            <button className="primary-button" onClick={() => scrollTo('programacao')}>
              OUVIR AGORA <span>▶</span>
            </button>
          </div>

          <div className="main-logo">
            <div className="radio-label">R Á D I O</div>
            <div className="manias">MANIAS</div>
            <div className="de-voce">DE VOCÊ</div>
            <div className="slogan">A alegria que faz bem viver</div>
          </div>

          <div className="hero-words">
            <strong className="word-pink">MÚSICA</strong>
            <strong className="word-blue">INFORMAÇÃO</strong>
            <strong className="word-yellow">ALEGRIA</strong>
            <strong className="word-lightpink">E MUITO AMOR!</strong>
          </div>
        </section>

        <section className="categories" id="comunidade">
          {CARDS.map((card) => (
            <article
              className="category-card"
              key={card.title}
              style={{ '--card-color': card.color } as React.CSSProperties}
            >
              <div className="card-picture">
                <div className="fallback-picture">{card.icon}</div>

                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.text}</p>

                <button onClick={() => scrollTo('radio')}>
                  VER
                  <br />
                  CONTEÚDOS
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="now-playing" id="programacao">
          <div className="playing-heading">
            <div className="live-dot" />

            <div>
              <small>NO AR AGORA</small>
              <h2>Rádio Manias de Você</h2>
              <p>A melhor programação, 24 horas com você!</p>
            </div>
          </div>

          <div className="player-shell">
            <iframe
              src="https://player.srvsh.com.br/player-web/8040"
              title="Player da Rádio Manias de Você"
              frameBorder={0}
              width="100%"
              height="465"
              allow="autoplay"
            />
          </div>
        </section>

        <section className="info-grid" id="radio">
          <article className="info-card">
            <small>POR QUE OUVIR?</small>
            <h2>A alegria que faz bem viver</h2>
            <p>
              Uma rádio feita para crianças, jovens, adultos e famílias inteiras.
              Música boa, informação, histórias e companhia em qualquer hora do dia.
            </p>
            <div className="heart">♡</div>
          </article>

          <article className="info-card">
            <small>PRAÇA MANIAS</small>
            <h2>O ponto de encontro dos ouvintes</h2>
            <p>
              Participe, peça sua música, conte sua história e faça parte da programação
              da Rádio Manias de Você.
            </p>

            <button className="outline-button" onClick={() => scrollTo('comunidade')}>
              ACESSAR AGORA
            </button>
          </article>

          <article className="info-card">
            <small>FUTUROS SORTEIOS</small>
            <h2>Prêmios incríveis</h2>
            <p>
              Novidades e experiências especiais para os nossos ouvintes.
            </p>

            <button className="outline-button" onClick={() => scrollTo('sorteios')}>
              QUERO PARTICIPAR!
            </button>
          </article>
        </section>

        <section className="giveaway" id="sorteios">
          <div className="giveaway-logo">
            <div className="ring-logo">
              <span>RÁDIO</span>
              <strong>MANIAS</strong>
              <b>DE VOCÊ</b>
              <i>A RÁDIO DO<br />SEU CORAÇÃO!</i>
              <em>♡</em>
            </div>
          </div>

          <div className="giveaway-copy">
            <small>CLUBE DE SORTEIOS MANIAS</small>

            <h2>
              Entre na lista dos futuros sorteios da Rádio Manias de Você.
            </h2>

            <p>
              Deixe seu nome e e-mail para receber avisos sobre futuros sorteios,
              ações especiais, brindes, convites e novidades da rádio. Se você for
              contemplado, entraremos em contato somente pelos canais informados.
            </p>
          </div>

          <form className="giveaway-form" onSubmit={handleSubmit}>
            <label>
              Seu nome
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos chamar você?"
                required
              />
            </label>

            <label>
              Seu melhor e-mail
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="voce@exemplo.com"
                required
              />
            </label>

            <label>
              WhatsApp (opcional)
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </label>

            <button type="submit" disabled={pending}>
              {pending ? 'ENVIANDO...' : 'QUERO PARTICIPAR DOS SORTEIOS'}
            </button>

            <div className="form-status" aria-live="polite">
              {status}
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <small>RÁDIO</small>
          <strong>MANIAS</strong>
          <span>DE VOCÊ</span>
        </div>

        <div className="footer-rights">
          <div>© 2026 Rádio Manias de Você</div>
          <div>Todos os direitos reservados.</div>
          <div className="organization">
            Uma Organização: <strong>Fladmir Carvalho</strong>
          </div>
        </div>

        <div className="socials">
          <button aria-label="Facebook">f</button>
          <button aria-label="Instagram">◎</button>
          <button aria-label="YouTube">▶</button>
          <button aria-label="Rádio">◉</button>
        </div>
      </footer>
    </div>
  )
}

const PAGE_STYLES = `
html{
  scroll-behavior:smooth;
}

body{
  margin:0;
  background:#07000c;
}

#radio-manias{
  --pink:#ff2fb3;
  --purple:#b818ff;
  --gold:#ffbb25;
  --deep:#09000f;
  min-height:100vh;
  color:white;
  font-family:Arial,Helvetica,sans-serif;
  overflow:hidden;
  background:
    radial-gradient(circle at 50% 22%,rgba(126,0,125,.2),transparent 35%),
    linear-gradient(180deg,#090011 0%,#0d0012 42%,#070009 100%);
  position:relative;
}

#radio-manias *{
  box-sizing:border-box;
}

#radio-manias button,
#radio-manias input{
  font:inherit;
}

#radio-manias button{
  cursor:pointer;
}

/* FUNDO COM PONTOS */
#radio-manias .stars{
  position:absolute;
  inset:0;
  z-index:0;
  pointer-events:none;
  opacity:.85;
  background-image:
    radial-gradient(circle,#11d872 0 1.5px,transparent 2px),
    radial-gradient(circle,#ff31c8 0 1.5px,transparent 2px),
    radial-gradient(circle,#27a8ff 0 1.5px,transparent 2px),
    radial-gradient(circle,#ffbc19 0 1.5px,transparent 2px);
  background-size:
    89px 83px,
    133px 117px,
    157px 109px,
    181px 139px;
  background-position:
    12px 22px,
    47px 66px,
    79px 18px,
    30px 94px;
}

/* NAVEGAÇÃO */
#radio-manias .nav-bar{
  position:sticky;
  top:0;
  z-index:80;
  height:64px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:25px;
  padding:0 18px;
  background:rgba(3,0,7,.94);
  backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,42,190,.25);
}

#radio-manias .nav-bar button{
  min-width:115px;
  border:0;
  border-bottom:2px solid transparent;
  background:transparent;
  color:#fff;
  padding:9px 11px 8px;
  font-size:12px;
  font-weight:900;
  letter-spacing:.04em;
  transition:.25s ease;
}

#radio-manias .nav-bar button span{
  display:block;
  font-size:19px;
  margin-bottom:3px;
}

#radio-manias .nav-bar button:hover{
  color:#ff77d6;
  border-bottom-color:#ff2db7;
  text-shadow:0 0 12px #ff2db7;
}

/* HERO */
#radio-manias .hero{
  min-height:520px;
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:1fr minmax(420px,1.6fr) 1fr;
  align-items:center;
  gap:20px;
  padding:80px 6% 38px;
}

#radio-manias .hero-copy-left{
  max-width:340px;
  position:relative;
  z-index:8;
}

#radio-manias .hero-copy-left small{
  display:block;
  color:#ff68c8;
  font-weight:900;
  letter-spacing:.12em;
  margin-bottom:9px;
}

#radio-manias .hero-copy-left p{
  font-size:17px;
  line-height:1.55;
  margin:0 0 28px;
}

#radio-manias .primary-button{
  border:1px solid #ff45ca;
  color:#fff;
  background:linear-gradient(135deg,#ec188d,#7027e9);
  padding:16px 24px;
  border-radius:18px;
  font-weight:900;
  box-shadow:
    0 0 12px rgba(255,24,173,.75),
    inset 0 0 16px rgba(255,255,255,.12);
}

#radio-manias .main-logo{
  position:relative;
  z-index:8;
  text-align:center;
  padding-top:15px;
}

#radio-manias .radio-label{
  font-family:Georgia,serif;
  letter-spacing:.34em;
  color:#ffd678;
  font-size:23px;
  margin-bottom:6px;
}

#radio-manias .manias{
  font-family:Georgia,'Times New Roman',serif;
  font-size:clamp(72px,9vw,136px);
  font-weight:900;
  line-height:.82;
  letter-spacing:.035em;
  color:#ff9c18;
  -webkit-text-stroke:1px #ffd873;
  text-shadow:
    0 0 6px #fff0a6,
    0 0 15px #ffac20,
    0 0 36px rgba(255,76,0,.9);
}

#radio-manias .de-voce{
  margin-top:12px;
  font-family:Georgia,serif;
  font-size:clamp(38px,5vw,67px);
  font-weight:900;
  letter-spacing:.18em;
  color:#ffad30;
  text-shadow:0 0 15px rgba(255,117,0,.9);
}

#radio-manias .slogan{
  margin-top:30px;
  font-family:Georgia,serif;
  font-size:clamp(25px,3vw,42px);
  font-weight:700;
  font-style:italic;
  color:#ffd363;
  text-shadow:0 0 16px rgba(255,168,23,.85);
}

#radio-manias .hero-words{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:27px;
  position:relative;
  z-index:8;
  font-style:italic;
}

#radio-manias .hero-words strong{
  font-size:clamp(24px,2.5vw,42px);
}

#radio-manias .word-pink{
  color:#ff35bd;
}

#radio-manias .word-blue{
  color:#29b7ff;
}

#radio-manias .word-yellow{
  color:#ffcd29;
}

#radio-manias .word-lightpink{
  color:#ff76d4;
}

/* REFLETORES */
#radio-manias .spotlights{
  position:absolute;
  z-index:4;
  top:-65px;
  left:10%;
  right:10%;
  height:350px;
  pointer-events:none;
}

#radio-manias .spot{
  --light:#fff;
  --angle:0deg;
  position:absolute;
  top:0;
  width:100px;
  height:100px;
  transform:rotate(var(--angle));
  filter:drop-shadow(0 10px 12px rgba(0,0,0,.55));
}

#radio-manias .spot-green{
  --light:#22ff43;
  --angle:16deg;
  left:4%;
}

#radio-manias .spot-white{
  --light:#fff7dc;
  --angle:7deg;
  left:34%;
}

#radio-manias .spot-yellow{
  --light:#ffd11a;
  --angle:-8deg;
  left:63%;
}

#radio-manias .spot-pink{
  --light:#ff27d5;
  --angle:-16deg;
  right:2%;
}

#radio-manias .mount{
  position:absolute;
  top:-15px;
  left:34px;
  width:32px;
  height:38px;
  border-radius:8px 8px 3px 3px;
  background:linear-gradient(90deg,#151515,#323232 42%,#0a0a0a);
  border-left:4px solid #ba802d;
  border-right:4px solid #76501e;
}

#radio-manias .spot-body{
  position:absolute;
  top:15px;
  left:7px;
  width:86px;
  height:72px;
  border-radius:13px 13px 38px 38px;
  background:
    linear-gradient(145deg,#070707,#303030 38%,#0b0b0b 64%,#171717);
  border:2px solid #906226;
  box-shadow:
    inset 0 3px 3px rgba(255,255,255,.14),
    inset 0 -8px 13px #000;
}

#radio-manias .gold-ring{
  position:absolute;
  left:20px;
  top:22px;
  width:47px;
  height:40px;
  border-radius:50%;
  border:5px solid #b57c23;
  box-shadow:
    inset 0 0 3px #ffd872,
    0 0 5px rgba(255,186,70,.45);
}

#radio-manias .lens{
  position:absolute;
  left:27px;
  top:29px;
  width:33px;
  height:27px;
  border-radius:50%;
  background:radial-gradient(circle,#fff 0 12%,var(--light) 25%,#222 74%);
  box-shadow:
    0 0 12px var(--light),
    0 0 28px var(--light);
}

#radio-manias .beam{
  position:absolute;
  top:75px;
  left:-60px;
  width:220px;
  height:320px;
  opacity:.14;
  clip-path:polygon(40% 0,60% 0,100% 100%,0 100%);
  background:linear-gradient(
    180deg,
    var(--light),
    color-mix(in srgb,var(--light) 55%,transparent),
    transparent
  );
  filter:blur(3px);
  animation:beamPulse 4.5s ease-in-out infinite;
}

@keyframes beamPulse{
  0%,100%{opacity:.10}
  50%{opacity:.22}
}

/* CARDS */
#radio-manias .categories{
  position:relative;
  z-index:4;
  max-width:1280px;
  margin:0 auto;
  padding:15px 24px 42px;
  display:grid;
  grid-template-columns:repeat(6,minmax(0,1fr));
  gap:11px;
}

#radio-manias .category-card{
  --card-color:#ff36b9;
  overflow:hidden;
  border:1px solid var(--card-color);
  border-radius:17px;
  background:rgba(8,0,13,.9);
  box-shadow:
    0 0 10px color-mix(in srgb,var(--card-color) 32%,transparent);
}

#radio-manias .card-picture{
  height:150px;
  position:relative;
  overflow:hidden;
  border-bottom:1px solid var(--card-color);
  background:#120017;
}

#radio-manias .card-picture img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

#radio-manias .fallback-picture{
  position:absolute;
  inset:0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:65px;
  color:var(--card-color);
  background:
    radial-gradient(circle at center,color-mix(in srgb,var(--card-color) 30%,transparent),transparent 60%);
}

#radio-manias .card-content{
  padding:17px 12px 14px;
  text-align:center;
}

#radio-manias .card-content h3{
  margin:0;
  font-size:17px;
}

#radio-manias .card-content p{
  min-height:62px;
  margin:11px 0;
  font-size:12px;
  line-height:1.5;
}

#radio-manias .card-content button{
  width:100%;
  min-height:50px;
  border:1px solid var(--card-color);
  border-radius:999px;
  background:#08000d;
  color:#fff;
  font-weight:900;
}

/* PLAYER */
#radio-manias .now-playing{
  position:relative;
  z-index:3;
  max-width:1360px;
  margin:5px auto 28px;
  padding:22px;
  border:1px solid #e72cad;
  border-radius:23px;
  background:rgba(8,0,14,.88);
}

#radio-manias .playing-heading{
  display:flex;
  gap:18px;
  align-items:center;
  margin-bottom:22px;
}

#radio-manias .live-dot{
  width:19px;
  height:19px;
  border-radius:50%;
  background:#ff2da4;
  box-shadow:0 0 18px #ff2da4;
}

#radio-manias .playing-heading small{
  color:#ff4ebe;
  font-size:11px;
}

#radio-manias .playing-heading h2{
  font-size:19px;
  margin:5px 0;
}

#radio-manias .playing-heading p{
  font-size:12px;
  margin:0;
  opacity:.85;
}

#radio-manias .player-shell{
  overflow:hidden;
  border-radius:18px;
  min-height:465px;
  background:
    linear-gradient(90deg,#003ac0,#3f25c9,#b83cde);
  box-shadow:inset 0 0 50px rgba(16,0,70,.75);
}

#radio-manias .player-shell iframe{
  display:block;
  width:100%;
  min-height:465px;
  border:0;
}

/* 3 BLOCOS */
#radio-manias .info-grid{
  position:relative;
  z-index:3;
  max-width:1320px;
  margin:0 auto;
  padding:0 24px 42px;
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:18px;
}

#radio-manias .info-card{
  min-height:300px;
  padding:30px;
  border:1px solid rgba(255,47,180,.55);
  border-radius:22px;
  background:
    linear-gradient(145deg,rgba(24,0,30,.92),rgba(5,0,10,.94));
}

#radio-manias .info-card small{
  color:#ff4fc2;
  font-weight:900;
}

#radio-manias .info-card h2{
  font-size:30px;
  line-height:1.35;
  margin:21px 0 12px;
}

#radio-manias .info-card p{
  font-size:17px;
  line-height:1.6;
  color:#e8deeb;
}

#radio-manias .outline-button{
  margin-top:10px;
  border:1px solid #ff3ebd;
  border-radius:999px;
  padding:13px 20px;
  background:transparent;
  color:#ffd7f2;
  font-weight:900;
}

#radio-manias .heart{
  margin-top:20px;
  font-size:45px;
  text-align:center;
  color:#ff54c5;
}

/* SORTEIOS */
#radio-manias .giveaway{
  position:relative;
  z-index:3;
  max-width:1360px;
  margin:0 auto 32px;
  padding:40px;
  border:1px solid rgba(255,41,177,.55);
  border-radius:28px;
  display:grid;
  grid-template-columns:.85fr 1.2fr 1fr;
  gap:40px;
  align-items:center;
  background:
    radial-gradient(circle at 20% 35%,rgba(255,71,62,.13),transparent 32%),
    radial-gradient(circle at 68% 20%,rgba(160,0,255,.13),transparent 35%),
    rgba(6,0,12,.9);
}

#radio-manias .ring-logo{
  aspect-ratio:1;
  width:min(300px,100%);
  margin:auto;
  border-radius:50%;
  border:4px solid transparent;
  background:
    linear-gradient(#09000e,#09000e) padding-box,
    conic-gradient(#ffb800,#ff3cac,#a62cff,#ffb800) border-box;
  box-shadow:
    0 0 28px rgba(255,41,177,.35);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
}

#radio-manias .ring-logo span{
  letter-spacing:.2em;
  color:#ff62ca;
}

#radio-manias .ring-logo strong{
  font-size:48px;
  color:#ff3bbf;
  text-shadow:0 0 15px #ff209e;
}

#radio-manias .ring-logo b{
  font-size:25px;
}

#radio-manias .ring-logo i{
  margin-top:27px;
  color:#ffcc28;
  font-weight:900;
  font-style:normal;
}

#radio-manias .ring-logo em{
  margin-top:12px;
  color:#ff3bbf;
  font-size:42px;
  font-style:normal;
}

#radio-manias .giveaway-copy small{
  color:#ff52c2;
  letter-spacing:.13em;
  font-weight:900;
}

#radio-manias .giveaway-copy h2{
  margin:15px 0;
  font-size:clamp(34px,4vw,57px);
  line-height:1.08;
}

#radio-manias .giveaway-copy p{
  font-size:17px;
  line-height:1.65;
  color:#ddd3df;
}

#radio-manias .giveaway-form{
  padding:24px;
  border:1px solid rgba(255,255,255,.1);
  border-radius:25px;
  background:rgba(5,0,9,.8);
}

#radio-manias .giveaway-form label{
  display:block;
  margin-bottom:16px;
  color:#ffa6df;
  font-size:13px;
  font-weight:900;
}

#radio-manias .giveaway-form input{
  width:100%;
  margin-top:8px;
  padding:16px;
  border:1px solid rgba(255,61,189,.4);
  border-radius:14px;
  outline:none;
  background:#0d0610;
  color:#fff;
}

#radio-manias .giveaway-form input:focus{
  border-color:#ff42bf;
  box-shadow:0 0 12px rgba(255,42,182,.23);
}

#radio-manias .giveaway-form button{
  width:100%;
  min-height:58px;
  border:0;
  border-radius:999px;
  background:linear-gradient(100deg,#ff239e,#af20ff);
  color:white;
  font-weight:900;
  font-size:16px;
  box-shadow:0 0 20px rgba(255,30,175,.4);
}

#radio-manias .giveaway-form button:disabled{
  opacity:.65;
}

#radio-manias .form-status{
  min-height:22px;
  margin-top:12px;
  text-align:center;
  color:#ffd4ee;
  font-size:13px;
}

/* RODAPÉ */
#radio-manias .footer{
  position:relative;
  z-index:3;
  min-height:135px;
  display:grid;
  grid-template-columns:1fr 2fr 1fr;
  gap:25px;
  align-items:center;
  padding:28px 5%;
  border-top:1px solid rgba(255,36,183,.35);
  background:#050008;
}

#radio-manias .footer-brand{
  display:flex;
  flex-direction:column;
}

#radio-manias .footer-brand small{
  font-size:11px;
}

#radio-manias .footer-brand strong{
  font-size:23px;
  color:#ff41bd;
}

#radio-manias .footer-brand span{
  margin-top:3px;
  font-size:13px;
}

#radio-manias .footer-rights{
  text-align:center;
  line-height:1.7;
  font-size:14px;
}

#radio-manias .organization{
  font-family:Georgia,serif;
  font-weight:700;
}

#radio-manias .organization strong{
  color:#f0d878;
  text-shadow:0 0 10px rgba(240,216,120,.4);
}

#radio-manias .socials{
  display:flex;
  justify-content:flex-end;
  gap:10px;
}

#radio-manias .socials button{
  width:43px;
  height:43px;
  border-radius:50%;
  border:1px solid #ff39b9;
  background:#09000d;
  color:white;
  font-weight:900;
}

/* ÚNICO TIK PICKE FLUTUANTE */
#radio-manias .floating-mascot{
  position:fixed;
  z-index:100;
  left:15px;
  top:95px;
  width:120px;
  height:120px;
  pointer-events:none;
  animation:tikPickeTravel 42s ease-in-out infinite alternate;
  will-change:transform;
}

#radio-manias .mascot-frame{
  position:relative;
  width:100%;
  height:100%;
  overflow:hidden;
  border-radius:28px;
  border:2px solid #d59a33;
  background:#13051c;
  box-shadow:
    0 0 10px #ffb13a,
    0 0 25px rgba(255,164,42,.46),
    0 12px 30px rgba(0,0,0,.45);
}

#radio-manias .mascot-frame img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

/*
  Tom marrom concentrado na parte inferior,
  dando aparência mais marrom à roupa sem alterar o rosto.
*/
#radio-manias .brown-shirt-tint{
  position:absolute;
  left:9%;
  right:9%;
  bottom:3%;
  height:45%;
  border-radius:0 0 25px 25px;
  background:rgba(105,61,31,.33);
  mix-blend-mode:color;
  pointer-events:none;
}

@keyframes tikPickeTravel{
  0%{
    transform:translate3d(0,0,0) rotate(-2deg);
  }
  14%{
    transform:translate3d(70vw,6vh,0) rotate(2deg);
  }
  28%{
    transform:translate3d(30vw,29vh,0) rotate(-3deg);
  }
  42%{
    transform:translate3d(72vw,42vh,0) rotate(2deg);
  }
  57%{
    transform:translate3d(6vw,58vh,0) rotate(-2deg);
  }
  72%{
    transform:translate3d(65vw,69vh,0) rotate(3deg);
  }
  87%{
    transform:translate3d(26vw,79vh,0) rotate(-2deg);
  }
  100%{
    transform:translate3d(72vw,82vh,0) rotate(2deg);
  }
}

/* RESPONSIVO */
@media(max-width:1100px){
  #radio-manias .hero{
    grid-template-columns:1fr;
    padding-top:115px;
    text-align:center;
  }

  #radio-manias .hero-copy-left{
    max-width:650px;
    margin:auto;
  }

  #radio-manias .hero-words{
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:center;
  }

  #radio-manias .categories{
    grid-template-columns:repeat(3,1fr);
  }

  #radio-manias .giveaway{
    grid-template-columns:1fr 1fr;
  }

  #radio-manias .giveaway-form{
    grid-column:1/-1;
  }
}

@media(max-width:760px){
  #radio-manias .nav-bar{
    height:auto;
    gap:2px;
    padding:5px;
  }

  #radio-manias .nav-bar button{
    min-width:0;
    flex:1;
    padding:8px 3px;
    font-size:9px;
  }

  #radio-manias .nav-bar button span{
    font-size:15px;
  }

  #radio-manias .hero{
    min-height:700px;
    padding:135px 22px 34px;
  }

  #radio-manias .spotlights{
    left:0;
    right:0;
    transform:scale(.72);
    transform-origin:top center;
  }

  #radio-manias .manias{
    font-size:60px;
  }

  #radio-manias .de-voce{
    font-size:30px;
  }

  #radio-manias .slogan{
    font-size:23px;
  }

  #radio-manias .categories{
    grid-template-columns:repeat(2,1fr);
    padding:15px;
  }

  #radio-manias .info-grid{
    grid-template-columns:1fr;
  }

  #radio-manias .giveaway{
    grid-template-columns:1fr;
    margin:0 15px 28px;
    padding:24px;
  }

  #radio-manias .giveaway-form{
    grid-column:auto;
  }

  #radio-manias .footer{
    grid-template-columns:1fr;
    text-align:center;
  }

  #radio-manias .socials{
    justify-content:center;
  }

  #radio-manias .footer-brand{
    align-items:center;
  }

  #radio-manias .floating-mascot{
    width:82px;
    height:82px;
  }

  @keyframes tikPickeTravel{
    0%{transform:translate3d(0,0,0)}
    25%{transform:translate3d(68vw,18vh,0)}
    50%{transform:translate3d(8vw,47vh,0)}
    75%{transform:translate3d(66vw,68vh,0)}
    100%{transform:translate3d(18vw,78vh,0)}
  }
}

@media(max-width:480px){
  #radio-manias .categories{
    grid-template-columns:1fr;
  }

  #radio-manias .category-card{
    max-width:340px;
    width:100%;
    margin:auto;
  }

  #radio-manias .hero-words strong{
    font-size:21px;
  }
}

@media(prefers-reduced-motion:reduce){
  #radio-manias .floating-mascot,
  #radio-manias .beam{
    animation:none;
  }
}
`
