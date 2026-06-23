import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  const [hrv, setHrv] = useState(65)

  // Obtener estado adaptativo según el HRV
  const getHrvStatus = (val) => {
    if (val >= 80) {
      return {
        status: 'Supercompensación · Óptimo',
        title: 'Aumento de Carga',
        description: 'Tu sistema nervioso autónomo está recuperado y con excelente predisposición al estrés físico. Es el momento perfecto para sesiones de alta intensidad o series pesadas.',
        color: '#c3f400', // lime
        pulseDuration: '1.3s',
        label: 'HIGH_HRV'
      }
    } else if (val >= 55) {
      return {
        status: 'Homeostasis · Estable',
        title: 'Mantener Carga',
        description: 'Niveles de fatiga y recuperación en equilibrio dinámico. Podés continuar con tu plan programado manteniendo la intensidad y volumen estándar.',
        color: '#4b8eff', // blue
        pulseDuration: '0.8s',
        label: 'NORMAL_HRV'
      }
    } else {
      return {
        status: 'Simpático Dominante · Fatiga',
        title: 'Deload / Descanso Activo',
        description: 'Variabilidad cardíaca deprimida. Tu cuerpo está combatiendo estrés o fatiga acumulada. Se recomienda una sesión de movilidad regenerativa o descanso total.',
        color: '#fc6100', // deload orange
        pulseDuration: '0.5s',
        label: 'LOW_HRV'
      }
    }
  }

  const rec = getHrvStatus(hrv)

  return (
    <div className="landing">
      {/* Hero Section */}
      <header className="landing-hero">
        <span className="landing-hero__eyebrow">Plataforma Deportiva Inteligente</span>
        <h2 className="landing-hero__title">Entrená al Ritmo de tu Corazón</h2>
        <p className="landing-hero__description">
          CoachIA analiza la Variabilidad de la Frecuencia Cardíaca (HRV) para ajustar dinámicamente
          la carga de tus entrenamientos. Maximizá tus ganancias y evitá el sobreentrenamiento con datos reales.
        </p>
      </header>

      {/* Simulator Section (Signature Element) */}
      <section className="panel panel__inner simulator-panel">
        <div className="panel__header">
          <div>
            <h3 className="panel__title">Simulador Biométrico</h3>
            <p className="panel__subtitle">
              Arrastrá el control para simular lecturas de HRV y ver el motor adaptativo en acción.
            </p>
          </div>
        </div>

        <div className="simulator-layout">
          {/* Card de Monitor Biométrico */}
          <div className="heart-rate-monitor">
            <div className="heart-rate-monitor__display">
              <div 
                className="heart-icon-wrapper" 
                style={{ 
                  '--pulse-duration': rec.pulseDuration,
                  '--pulse-color': rec.color
                }}
              >
                <div className="heart-pulse-ring" />
                <span className="material-symbols-outlined heart-icon">
                  favorite
                </span>
              </div>

              <div className="hrv-value-display">
                <div className="hrv-value-display__number">{hrv}</div>
                <div className="hrv-value-display__label">HRV (ms)</div>
              </div>
            </div>

            {/* ECG dinámico */}
            <svg 
              className="ecg-display" 
              viewBox="0 0 400 80" 
              preserveAspectRatio="none"
              key={rec.label} /* Forzar reinicio de animación al cambiar de estado para feedback inmediato */
            >
              <path
                d="M 0 40 L 100 40 L 110 30 L 115 45 L 122 15 L 130 65 L 138 40 L 145 40 L 250 40 L 260 30 L 265 45 L 272 15 L 280 65 L 288 40 L 295 40 L 400 40"
                fill="none"
                stroke={rec.color}
                strokeWidth="2.5"
                className="ecg-path"
              />
            </svg>
          </div>

          {/* Controles y Output */}
          <div className="simulator-controls">
            <div className="slider-container">
              <label htmlFor="hrv-input" className="field__label">Nivel de Variabilidad (HRV)</label>
              <input
                id="hrv-input"
                type="range"
                min="20"
                max="100"
                value={hrv}
                onChange={(e) => setHrv(parseInt(e.target.value))}
                className="hrv-slider"
                style={{ '--lime': rec.color }}
              />
              <div className="slider-labels">
                <span>20 ms (Fatigado)</span>
                <span>100 ms (Recuperado)</span>
              </div>
            </div>

            {/* Recomendación Dinámica */}
            <div 
              className="recommendation-output"
              style={{ '--status-color': rec.color, borderColor: `${rec.color}22` }}
            >
              <span className="recommendation-output__status">
                {rec.status}
              </span>
              <h4 className="recommendation-output__title">
                {rec.title}
              </h4>
              <p className="recommendation-output__description">
                {rec.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="features-grid">
        <article className="state-card feature-card">
          <span className="material-symbols-outlined feature-card__icon">
            monitoring
          </span>
          <h4 className="state-card__title">Lecturas de HRV</h4>
          <p className="state-card__text">
            Monitoreá tu estado fisiológico diariamente. HRV alto refleja un cuerpo recuperado; un HRV bajo indica que necesitás aflojar.
          </p>
        </article>

        <article className="state-card feature-card">
          <span className="material-symbols-outlined feature-card__icon">
            neurology
          </span>
          <h4 className="state-card__title">Planes Adaptativos</h4>
          <p className="state-card__text">
            Nuestros algoritmos ajustan automáticamente el volumen y la intensidad del entrenamiento para alinearse con tus datos biológicos.
          </p>
        </article>

        <article className="state-card feature-card">
          <span className="material-symbols-outlined feature-card__icon">
            shield_heart
          </span>
          <h4 className="state-card__title">Prevención de Lesiones</h4>
          <p className="state-card__text">
            Entrenar fuerte con fatiga del sistema nervioso central es la receta para el desastre. CoachIA te frena a tiempo.
          </p>
        </article>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <h3 className="landing-cta__title">¿Listo para optimizar tu rendimiento?</h3>
        <div className="form-actions">
          <Link to="/planes" className="btn btn--primary">
            Gestionar Planes
          </Link>
          <Link to="/usuarios" className="btn btn--secondary">
            Ver Usuarios
          </Link>
        </div>
      </section>
    </div>
  )
}
