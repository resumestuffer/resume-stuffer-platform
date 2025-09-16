# Student Section Images

## Required Images

### Main Hero Image
- **File**: `hero-students-main.webp`
- **Size**: 1920x1080 (16:9)
- **Subject**: Diverse group of confident high school students with laptops/books in modern space
- **Usage**: Main students page hero background

### Pathway Background Images  
- **File**: `pathway-college-prep.webp`
- **Size**: 800x600 (4:3)
- **Subject**: Focused student studying with AP/academic materials
- **Usage**: College prep pathway card background

- **File**: `pathway-tech-careers.webp` 
- **Size**: 800x600 (4:3)
- **Subject**: Young person coding/working on computer setup
- **Usage**: Tech careers pathway card background

- **File**: `pathway-skilled-trades.webp`
- **Size**: 800x600 (4:3)  
- **Subject**: Young person in workshop/hands-on learning environment
- **Usage**: Skilled trades pathway card background

- **File**: `pathway-business-skills.webp`
- **Size**: 800x600 (4:3)
- **Subject**: Professional young person with business/presentation context  
- **Usage**: Business skills pathway card background

## Implementation Notes

Once images are added:
1. Remove placeholder gradient backgrounds
2. Add `OptimizedImage` components with proper `fill` and `sizes` props
3. Keep gradient overlays for text readability
4. Test performance and loading

## Image Optimization Settings
- Format: WebP (with JPEG fallback)
- Quality: 75-85% 
- Responsive: Multiple sizes for different breakpoints
- Loading: Lazy load except hero (priority)