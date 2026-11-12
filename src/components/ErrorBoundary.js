/**
 * CERVECERÍA NORTA - REACT ERROR BOUNDARY & RESILIENCE COMPONENT (V15.0)
 * 
 * Componente de contención de fallos que evita la caída de la aplicación entera (White Screen of Death)
 * ante excepciones no controladas en subcomponentes (gráficos SVG, cálculos de densidad, tablas, etc.).
 * Provee interfaz visual con identidad NORTA, diagnóstico técnico forense y recuperación sin recarga forzada.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(root.React, root.AuditLogger);
  } else {
    root.ErrorBoundary = factory(root.React, root.AuditLogger);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function(React, AuditLogger) {
  'use strict';

  if (!React) {
    console.error('[ErrorBoundary] React no se encuentra disponible en el ámbito global.');
    return function() { return null; };
  }

  const { Component, createElement: h } = React;

  class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
        showTrace: false
      };
      this.handleReset = this.handleReset.bind(this);
      this.toggleTrace = this.toggleTrace.bind(this);
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ errorInfo });

      // Registro forense en AuditLogger
      if (AuditLogger && AuditLogger.error) {
        AuditLogger.error('SISTEMA', `Falla interceptada en ErrorBoundary [${this.props.name || 'General'}]: ${error.message}`, {
          module: this.props.name || 'Unknown',
          stack: error.stack,
          componentStack: errorInfo ? errorInfo.componentStack : null
        });
      }

      console.error(`[NORTA ErrorBoundary: ${this.props.name || 'General'}]`, error, errorInfo);
    }

    handleReset() {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        showTrace: false
      });
      if (this.props.onReset) {
        try {
          this.props.onReset();
        } catch (e) {
          console.warn('[ErrorBoundary] Error en callback onReset:', e);
        }
      }
    }

    toggleTrace() {
      this.setState(prev => ({ showTrace: !prev.showTrace }));
    }

    render() {
      if (!this.state.hasError) {
        return this.props.children;
      }

      const moduleName = this.props.name || 'Módulo Operativo';
      const errorMessage = this.state.error ? this.state.error.message : 'Error no especificado';
      const stackTrace = this.state.error ? this.state.error.stack : '';
      const componentStack = this.state.errorInfo ? this.state.errorInfo.componentStack : '';

      return h('div', {
        className: 'my-4 p-6 rounded-2xl border border-amber-600/40 bg-[#161410] text-[#f7f4ed] shadow-2xl space-y-4 max-w-4xl mx-auto'
      },
        // Cabecera con identidad NORTA
        h('div', { className: 'flex items-center gap-3 border-b border-[#2d2a24] pb-4' },
          h('div', { className: 'w-10 h-10 rounded-xl bg-[#0e2334] border border-[#b89764] flex items-center justify-center text-xl shadow' }, '🛡️'),
          h('div', null,
            h('h3', { className: 'text-lg font-bold text-[#c9b38f] tracking-wide flex items-center gap-2' },
              'Aislamiento de Falla Operativa',
              h('span', { className: 'text-xs px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/50 uppercase font-mono' },
                moduleName
              )
            ),
            h('p', { className: 'text-xs text-stone-400' },
              'El subárbol fue contenido con éxito para proteger la integridad del resto de la planta cervecera.'
            )
          )
        ),

        // Cuerpo descriptivo del fallo
        h('div', { className: 'p-3 rounded-lg bg-black/40 border border-stone-800 text-xs font-mono text-amber-200/90 break-words' },
          h('strong', { className: 'text-stone-300 block mb-1 font-sans text-xs' }, 'Detalle de la Excepción:'),
          errorMessage
        ),

        // Botones de acción y recuperación
        h('div', { className: 'flex flex-wrap items-center gap-3 pt-2' },
          h('button', {
            onClick: this.handleReset,
            className: 'px-4 py-2 rounded-xl bg-[#b89764] hover:bg-[#c9b38f] text-[#1d1d1b] font-bold text-xs shadow-md transition-all flex items-center gap-2'
          },
            h('span', null, '🔄'),
            'Reintentar Módulo'
          ),
          h('button', {
            onClick: () => {
              if (this.props.onNavigateHome) {
                this.props.onNavigateHome();
              } else if (typeof window !== 'undefined') {
                window.location.hash = '';
              }
              this.handleReset();
            },
            className: 'px-4 py-2 rounded-xl bg-[#0e2334] hover:bg-[#15344d] text-white font-bold text-xs border border-[#c9b38f]/40 shadow transition-all flex items-center gap-2'
          },
            h('span', null, '🏠'),
            'Volver al Panel Principal'
          ),
          h('button', {
            onClick: this.toggleTrace,
            className: 'px-3 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-semibold text-xs border border-stone-700 transition-all flex items-center gap-1.5'
          },
            h('span', null, this.state.showTrace ? '🔼 Ocultar Traza' : '🔍 Ver Traza Forense')
          )
        ),

        // Traza técnica colapsable
        this.state.showTrace && h('div', { className: 'mt-4 pt-3 border-t border-stone-800 space-y-2' },
          h('p', { className: 'text-[11px] font-bold text-stone-400' }, 'Traza Técnica Forense (Stack Trace):'),
          h('pre', {
            className: 'p-3 rounded-lg bg-black/70 border border-stone-800 text-[10px] text-stone-300 overflow-x-auto font-mono max-h-52'
          }, `${stackTrace}\n\nComponent Stack:${componentStack}`)
        )
      );
    }
  }

  return ErrorBoundary;
});
