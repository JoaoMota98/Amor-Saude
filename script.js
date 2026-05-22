    // Page configurations
    const pageConfig = {
      dashboard: {
        title: 'Painel Executivo da Operação',
        subtitle: 'Fev 2026',
        sidebarTitle: 'Gestão SUS',
        userName: 'Dr. Admin',
        userRole: 'CRM/SP 12.345',
        userAvatar: 'DA',
        avatarColor: 'bg-yellow-500'
      },
      paciente: {
        title: 'Visão Geral',
        subtitle: '',
        sidebarTitle: 'Portal SUS',
        userName: 'João da Silva',
        userRole: 'CPF: 123.***.***-00',
        userAvatar: 'JD',
        avatarColor: 'bg-yellow-500'
      },
      prontuario: {
        title: 'Receituário Digital',
        subtitle: 'Protocolo: #982374',
        sidebarTitle: 'Prontuário SUS',
        userName: 'Dr. Carlos Eduardo',
        userRole: 'CRM/SP 45.123',
        userAvatar: 'CE',
        avatarColor: 'bg-blue-500'
      },
      dispensacao: {
        title: 'Dispensação de Medicamentos',
        subtitle: '3 pendentes',
        sidebarTitle: 'Farmácia SUS',
        userName: 'Farm. Juliana Costa',
        userRole: 'CRF/SP 12.345',
        userAvatar: 'JC',
        avatarColor: 'bg-blue-500'
      },
      estoque: {
        title: 'Gestão de Estoque',
        subtitle: '',
        sidebarTitle: 'Gestão SUS',
        userName: 'Dr. Admin',
        userRole: 'CRM/SP 12.345',
        userAvatar: 'DA',
        avatarColor: 'bg-yellow-500'
      },
      relatorios: {
        title: 'Relatórios',
        subtitle: '',
        sidebarTitle: 'Gestão SUS',
        userName: 'Dr. Admin',
        userRole: 'CRM/SP 12.345',
        userAvatar: 'DA',
        avatarColor: 'bg-yellow-500'
      },
      configuracoes: {
        title: 'Configurações',
        subtitle: '',
        sidebarTitle: 'Gestão SUS',
        userName: 'Dr. Admin',
        userRole: 'CRM/SP 12.345',
        userAvatar: 'DA',
        avatarColor: 'bg-yellow-500'
      }
    };

    // Current page
    let currentPage = 'dashboard';

    // Navigation function
    function navigateTo(page) {
      // Hide all content
      document.querySelectorAll('.page-content').forEach(el => {
        el.classList.add('hidden');
      });

      // Show selected content
      const content = document.getElementById(`${page}-content`);
      if (content) {
        content.classList.remove('hidden');
      }

      // Update navigation active state
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-white/10', 'text-white');
        el.classList.add('text-gray-300', 'hover:bg-white/5');
      });

      const activeNav = document.querySelector(`[data-nav="${page}"]`);
      if (activeNav) {
        activeNav.classList.remove('text-gray-300', 'hover:bg-white/5');
        activeNav.classList.add('bg-white/10', 'text-white');
      }

      // Update page info
      const config = pageConfig[page];
      if (config) {
        document.getElementById('page-title').textContent = config.title;
        document.getElementById('page-subtitle').textContent = config.subtitle;
        document.getElementById('sidebar-title').textContent = config.sidebarTitle;
        document.getElementById('user-name').textContent = config.userName;
        document.getElementById('user-role').textContent = config.userRole;
        
        const avatar = document.getElementById('user-avatar');
        avatar.textContent = config.userAvatar;
        avatar.className = `w-9 h-9 rounded-full ${config.avatarColor} flex items-center justify-center text-sidebar font-semibold text-sm`;
      }

      // Close mobile sidebar
      closeSidebar();

      currentPage = page;
    }

    // Sidebar toggle
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      const labels = document.querySelectorAll('.sidebar-label');
      
      if (window.innerWidth >= 1024) {
        // Modo Desktop: Alterna a largura entre 56 (224px) e 20 (80px)
        const isCollapsed = sidebar.classList.contains('lg:w-20');
        
        sidebar.classList.toggle('lg:w-56', isCollapsed);
        sidebar.classList.toggle('lg:w-20', !isCollapsed);
        
        // Esconde ou mostra os textos e o botão interno
        labels.forEach(label => {
          // Usamos style.display para forçar o desaparecimento independente de classes lg: do Tailwind
          label.style.display = !isCollapsed ? 'none' : '';
        });
      } else {
        // Modo Mobile: Mantém o comportamento de abrir/fechar lateralmente
        // Reset de estilos caso tenha vindo do modo desktop
        labels.forEach(label => label.style.display = '');
        
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
      }
    }

    function closeSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      
      if (!sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
      }
    }

    // Prescription selection
   // Base de dados simulada para as prescrições
const dadosPrescricoes = {
  1: {
    nome: "João da Silva",
    cpf: "334.***.***-89",
    pedido: "#982374-26",
    medicamentos: [
      { nome: "Losartana 50mg", tipo: "Comprimido 50mg", lote: "L-1909C", qtd: "60 un" },
      { nome: "Omeprazol 20mg", tipo: "Cápsula 20mg", lote: "L-2201B", qtd: "30 un" }
    ]
  },
  2: {
    nome: "Maria Oliveira",
    cpf: "123.***.***-00",
    pedido: "#881234-26",
    medicamentos: [
      { nome: "Dipirona 500mg", tipo: "Comprimido 500mg", lote: "L-2024A", qtd: "20 un" },
      { nome: "Paracetamol 750mg", tipo: "Comprimido 750mg", lote: "L-2105D", qtd: "15 un" }
    ]
  },
  3: {
    nome: "Antônio Carlos",
    cpf: "789.***.***-11",
    pedido: "#774512-26",
    medicamentos: [
      { nome: "Metformina 850mg", tipo: "Comprimido 850mg", lote: "L-2011F", qtd: "90 un" }
    ]
  }
};

function selectPrescription(id) {
  const dados = dadosPrescricoes[id];
  if (!dados) return;

  // 1. Limpa TODOS os cards primeiro
  document.querySelectorAll('.presc-card').forEach(card => {
    // Reseta card
    card.classList.remove('border-accent', 'bg-accent/5');
    card.classList.add('border-gray-200');

    // Reseta ícone
    const avatar = card.querySelector('.avatar-icon');
    if (avatar) {
      avatar.classList.remove('bg-yellow-500');
      avatar.classList.add('bg-gray-400');
    }

    // Reseta badge para cinza
    const badge = card.querySelector('.status-badge');
    if (badge) {
      badge.classList.remove('bg-yellow-100', 'text-yellow-700');
      badge.classList.add('bg-gray-100', 'text-gray-600');
    }
  });

  // 2. Colore APENAS o card clicado
  const cardSelecionado = document.getElementById(`card-presc-${id}`);
  if (cardSelecionado) {
    // Colore card
    cardSelecionado.classList.remove('border-gray-200');
    cardSelecionado.classList.add('border-accent', 'bg-accent/5');

    // Colore ícone
    const avatarSelecionado = cardSelecionado.querySelector('.avatar-icon');
    if (avatarSelecionado) {
      avatarSelecionado.classList.remove('bg-gray-400');
      avatarSelecionado.classList.add('bg-yellow-500');
    }

    // Colore badge para amarelo
    const badgeSelecionado = cardSelecionado.querySelector('.status-badge');
    if (badgeSelecionado) {
      badgeSelecionado.classList.remove('bg-gray-100', 'text-gray-600');
      badgeSelecionado.classList.add('bg-yellow-100', 'text-yellow-700');
    }
  }

  // 3. Atualiza o cabeçalho da tabela
  document.getElementById('dispensacao-patient-info').textContent = 
    `Pedido ${dados.pedido} • ${dados.nome} • CPF: ${dados.cpf}`;

  // 4. Monta e injeta as linhas
  const tableBody = document.getElementById('dispensacao-table-body');
  tableBody.innerHTML = dados.medicamentos.map(med => `
    <tr>
      <td class="px-5 py-4">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-sm font-medium text-gray-900">${med.nome}</span>
        </div>
      </td>
      <td class="px-5 py-4 text-sm text-gray-600">${med.tipo}</td>
      <td class="px-5 py-4 text-sm text-gray-600">${med.lote}</td>
      <td class="px-5 py-4">
        <span class="flex items-center gap-1 text-sm text-accent font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ${med.lote}
        </span>
      </td>
      <td class="px-5 py-4 text-sm text-gray-900 font-medium">${med.qtd}</td>
    </tr>
  `).join('');
}

// Opcional: Chamar a função na inicialização para preencher a tabela com o primeiro paciente por padrão
document.addEventListener('DOMContentLoaded', () => {
  // O código de navegação existente...
  if (document.getElementById('dispensacao-content')) {
    selectPrescription(1);
  }
});

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      navigateTo('dashboard');
    });

    // Função para simular a chegada de dados do Back-end
function atualizarGrafico(dados) {
  document.getElementById('bar-jan').style.height = dados.jan + '%';
  document.getElementById('bar-fev').style.height = dados.fev + '%';
  document.getElementById('bar-mar').style.height = dados.mar + '%';
  document.getElementById('bar-abr').style.height = dados.abr + '%';
  document.getElementById('bar-mai').style.height = dados.mai + '%';
  document.getElementById('bar-jun').style.height = dados.jun + '%';
}

// Vamos simular uma atualização após 2 segundos para ver a animação acontecer:
setTimeout(() => {
  atualizarGrafico({
    jan: 50,
    fev: 90,
    mar: 30,
    abr: 70,
    mai: 40,
    jun: 85
  });
}, 2000);