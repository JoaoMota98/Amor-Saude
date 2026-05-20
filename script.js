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
    function selectPrescription(id) {
      console.log('Selected prescription:', id);
      // Add visual feedback here if needed
    }

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