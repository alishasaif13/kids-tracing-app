const generateRange = (start, end) => 
    Array.from({ length: end - start + 1 }, (_, i) => String(start + i));

export const TRACING_ITEMS = {
    letters: {
        title: 'Letter',
        items: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), 
        backPath: '/letters'
    },
    numbers: {
        title: 'Number',
        items: generateRange(1, 20).map(String),
        backPath: '/counting'
    },
    shapes: {
        title: 'Shape',
        items: ['Circle', 'Square', 'Triangle', 'Star', 'Diamond', 'Rectangle', 'Oval', 'Arrow'], 
        backPath: '/shapes' // Shapes ka backPath bhi add kar diya
    },
    urdu: {
        title: 'Huroof-e-Tahajji',
       items: [
    'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 
    'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 
    'م', 'ن', 'و', 'ہ', 'ء', 'ی', 'ے'
],

        backPath: '/urdu'
    } // urdu object close
}; // TRACING_ITEMS close (comma missing tha yahan)

export const getTracingData = (categoryId, item) => {
    const categoryData = TRACING_ITEMS[categoryId];
    if (!categoryData) return null;

    let currentItem;
    
    if (categoryId === 'letters') {
        currentItem = item.toUpperCase(); 
    } else if (categoryId === 'shapes') {
        currentItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); 
    } else {
        currentItem = item;
    }
    
    const itemsList = categoryData.items;
    const currentIndex = itemsList.indexOf(currentItem); 

    if (currentIndex === -1) return null;

    const nextItem = itemsList[(currentIndex + 1) % itemsList.length];
    const prevItem = itemsList[(currentIndex - 1 + itemsList.length) % itemsList.length];

    return {
        categoryTitle: categoryData.title,
        currentItem,
        nextItem, 
        prevItem,
        backPath: categoryData.backPath
    };
};