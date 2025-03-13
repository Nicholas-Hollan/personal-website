# 个人网站 - Interactive Portfolio

这是一个现代化的个人作品集网站，具有独特的3D交互效果和动态内容展示。

## 特色功能

### 1. 3D交互卡片
- 动态倾斜效果：根据鼠标位置实时调整卡片角度
- 平滑过渡动画：使用插值算法实现流畅的动画效果
- 立体文字效果：名字区域具有独立的3D变换和阴影效果

### 2. 动态内容展示
- 职业角色轮播：自动切换展示多个专业角色
- 响应式布局：适配不同屏幕尺寸
- 优雅的动画过渡：所有元素都具有平滑的动画效果

### 3. 社交媒体整合
- GitHub链接
- 抖音主页
- 一键复制邮箱地址

### 4. 视觉设计
- 现代简约风格
- 精心设计的颜色方案
- 优雅的字体选择
- 动态阴影效果

## 技术栈

- HTML5
- CSS3 (动画、变换、过渡效果)
- JavaScript (原生JS，无依赖)
- Google Fonts
- Font Awesome 图标库

## 安装说明

1. 克隆仓库：
```bash
git clone https://github.com/your-username/personal-website.git
```

2. 进入项目目录：
```bash
cd personal-website
```

3. 打开index.html或使用本地服务器运行：
```bash
# 使用Python启动简单的HTTP服务器
python -m http.server 8000
# 或使用Node.js的http-server
npx http-server
```

## 项目结构

```
personal-website/
│
├── index.html          # 主页面
├── styles.css          # 样式文件
├── imags/             # 图片资源目录
│   ├── profile-pic.jpg
│   └── ...
└── README.md          # 项目文档
```

## 自定义配置

### 修改个人信息

在`index.html`中：
```html
<span class="name-text">Your Name</span>
```

### 更新职业角色

在`index.html`的roles部分：
```html
<div class="roles">
    <span>角色1</span>
    <span>角色2</span>
    ...
</div>
```

### 修改社交媒体链接

更新相应的链接地址：
```html
<a href="你的GitHub链接" class="github-link">
<a href="你的抖音链接" class="douyin-link">
```

### 自定义样式

在`styles.css`中修改颜色、动画等：
```css
:root {
    --primary-color: #你的主色;
    --secondary-color: #你的辅色;
}
```

## 性能优化

- 使用requestAnimationFrame进行动画优化
- 实现60fps的平滑动画效果
- 优化的事件处理机制
- 响应式图片加载

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

- 确保启用JavaScript
- 建议使用现代浏览器以获得最佳3D效果
- 部分3D效果在移动设备上可能表现不同

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License - 详见LICENSE文件
