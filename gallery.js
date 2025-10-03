// 图库筛选功能
document.addEventListener('DOMContentLoaded', function() {
    // 筛选按钮点击事件
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            
            // 为当前点击的按钮添加active类
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-gray-200', 'hover:bg-gray-300');
            
            const filter = this.getAttribute('data-filter');
            
            // 筛选作品
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    // 添加淡入动画
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // 添加淡出动画
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 作品详情模态框
    const modal = document.getElementById('作品详情模态框');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // 打开模态框
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const image = galleryItem.querySelector('img').src;
            const title = galleryItem.querySelector('h3').textContent;
            const category = galleryItem.querySelector('span:last-child').textContent;
            const year = galleryItem.querySelector('span:first-child').textContent;
            
            // 更新模态框内容
            document.getElementById('modal-image').src = image;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-category').textContent = category;
            document.getElementById('modal-year').textContent = year;
            
            // 显示模态框
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            
            // 添加动画效果
            setTimeout(() => {
                modal.querySelector('.bg-white').style.transform = 'scale(1)';
                modal.querySelector('.bg-white').style.opacity = '1';
            }, 50);
        });
    });
    
    // 关闭模态框
    function hideModal() {
        modal.querySelector('.bg-white').style.transform = 'scale(0.9)';
        modal.querySelector('.bg-white').style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }, 300);
    }
    
    closeModal.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideModal();
        }
    });
    
    // 加载更多按钮功能
    const loadMoreBtn = document.getElementById('load-more');
    let isLoading = false;
    
    loadMoreBtn.addEventListener('click', function() {
        if (isLoading) return;
        
        isLoading = true;
        this.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 加载中...';
        
        // 模拟加载延迟
        setTimeout(() => {
            // 这里可以添加更多作品
            this.innerHTML = '没有更多作品';
            this.disabled = true;
            this.classList.add('opacity-50', 'cursor-not-allowed');
            isLoading = false;
        }, 1500);
    });
});
