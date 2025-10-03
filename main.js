document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换功能
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            // 切换菜单显示状态
 e.stopPropagation(); // 新增这一行
            mobileMenu.classList.toggle('hidden');
            
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
        
        // 点击菜单外部关闭菜单（增强用户体验）
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target) && 
                !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // 导航栏滚动效果
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('py-2');
                header.classList.remove('py-3');
            } else {
                header.classList.add('py-3');
                header.classList.remove('py-2');
            }
        });
    }
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // FAQ折叠面板功能
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = '0';
                icon.style.transform = 'rotate(0)';
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 300);
            }
        });
    });
    
    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('请填写必填字段');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 发送中...';
            
            setTimeout(() => {
                alert('您的消息已成功发送，我们会尽快回复您！');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
    
    // 图库图片切换效果
    const modal = document.getElementById('作品详情模态框');
    if (modal) {
        // 为每个作品定义多图集合
        const作品图片集 = {
            '凤凰朝阳挂毯': [
                'images/gallery-item1.jpg',
                'images/gallery-item1-2.jpg',
                'images/gallery-item1-3.jpg'
            ],
            '几何纹连衣裙': [
                'images/gallery-item2.jpg',
                'images/gallery-item2-2.jpg'
            ],
            '回形纹靠垫套': [
                'images/gallery-item3.jpg',
                'images/gallery-item3-2.jpg',
                'images/gallery-item3-3.jpg'
            ],
            '色块抽象装饰画': [
                'images/gallery-item4.jpg'
            ],
            '壮族传统嫁衣': [
                'images/gallery-item5.jpg',
                'images/gallery-item5-2.jpg',
                'images/gallery-item5-3.jpg',
                'images/gallery-item5-4.jpg'
            ],
            '壮锦图案台灯': [
                'images/gallery-item6.jpg',
                'images/gallery-item6-2.jpg'
            ]
        };
        
        // 当前图片索引
        let currentImageIndex = 0;
        let currentImages = [];
        
        // 添加图片导航按钮到模态框
        const modalImageContainer = modal.querySelector('.bg-gray-100');
        if (modalImageContainer) {
            // 创建上一张/下一张按钮
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fa fa-chevron-left text-3xl"></i>';
            prevBtn.className = 'absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors z-10';
            prevBtn.id = 'prev-image';
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fa fa-chevron-right text-3xl"></i>';
            nextBtn.className = 'absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors z-10';
            nextBtn.id = 'next-image';
            
            // 创建图片指示器
            const indicatorContainer = document.createElement('div');
            indicatorContainer.className = 'absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10';
            indicatorContainer.id = 'image-indicators';
            
            modalImageContainer.appendChild(prevBtn);
            modalImageContainer.appendChild(nextBtn);
            modalImageContainer.appendChild(indicatorContainer);
            
            // 切换到上一张图片
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentImages.length <= 1) return;
                
                currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                updateModalImage();
            });
            
            // 切换到下一张图片
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentImages.length <= 1) return;
                
                currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                updateModalImage();
            });
            
            // 键盘导航
            document.addEventListener('keydown', function(e) {
                if (modal.style.display !== 'flex') return;
                
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            });
        }
        
        // 当模态框打开时初始化图片集
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const title = this.closest('.gallery-item').querySelector('h3').textContent;
                currentImages = 作品图片集[title] || [this.closest('.gallery-item').querySelector('img').src];
                currentImageIndex = 0;
                
                // 更新指示器
                updateImageIndicators();
            });
        });
        
        // 更新模态框图片
        function updateModalImage() {
            const modalImage = document.getElementById('modal-image');
            if (modalImage && currentImages[currentImageIndex]) {
                // 添加淡入淡出效果
                modalImage.style.opacity = '0';
                setTimeout(() => {
                    modalImage.src = currentImages[currentImageIndex];
                    modalImage.style.opacity = '1';
                }, 200);
                
                // 更新指示器状态
                updateImageIndicators();
            }
        }
        
        // 更新图片指示器
        function updateImageIndicators() {
            const indicatorContainer = document.getElementById('image-indicators');
            if (!indicatorContainer) return;
            
            // 清空现有指示器
            indicatorContainer.innerHTML = '';
            
            // 创建新的指示器
            currentImages.forEach((img, index) => {
                const indicator = document.createElement('button');
                indicator.className = `w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`;
                indicator.addEventListener('click', function(e) {
                    e.stopPropagation();
                    currentImageIndex = index;
                    updateModalImage();
                });
                indicatorContainer.appendChild(indicator);
            });
            
            // 如果只有一张图片，隐藏导航按钮
            const navButtons = modal.querySelectorAll('#prev-image, #next-image');
            navButtons.forEach(btn => {
                btn.style.display = currentImages.length > 1 ? 'flex' : 'none';
                indicatorContainer.style.display = currentImages.length > 1 ? 'flex' : 'none';
            });
        }
    }
});
