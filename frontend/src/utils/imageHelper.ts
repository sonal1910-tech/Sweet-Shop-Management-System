
export const getSweetImage = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('laddu') || lowerName.includes('ladoo')) return 'https://images.unsplash.com/photo-1589119908358-420684fd5f79?auto=format&fit=crop&q=80&w=400';
    if (lowerName.includes('gulab jamun')) return 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=400';
    if (lowerName.includes('rasgulla')) return 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=400'; // Placeholder
    if (lowerName.includes('barfi')) return 'https://images.unsplash.com/photo-1599863266155-255018653a96?auto=format&fit=crop&q=80&w=400'; // Placeholder
    if (lowerName.includes('kaju') || lowerName.includes('katli')) return 'https://images.unsplash.com/photo-1621255535508-e3995f756038?auto=format&fit=crop&q=80&w=400'; // Placeholder
    if (lowerName.includes('jalebi')) return 'https://images.unsplash.com/photo-1589948102324-4c810967ace8?auto=format&fit=crop&q=80&w=400';

    return 'https://images.unsplash.com/photo-1544253132-736b412999dc?auto=format&fit=crop&q=80&w=400'; // Generic mithai
};
