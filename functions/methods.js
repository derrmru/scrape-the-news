module.exports = {
    capIt: (word) => {
        const exceptions = [
            'US',
            'UK',
            'UN',
            'EU',
            'PM',
            'MP',
            'TV',
            'NFL',
            'WW2',
            'BBC',
            'CNN',
            'UFC'
        ]
        if (exceptions.indexOf(word) >= 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    },
    filterWords: (word) => {
        const forbiddenWords = [
            'THERES',
            'HERES',
            'COULD',
            'WHERE',
            'THESE',
            'WHICH',
            'THEIR',
            'AFTER',
            'OVER',
            'SAYS',
            'FROM',
            'WITH',
            'THAT',
            'THAN',
            'THIS',
            'WHAT', 
            'WHEN', 
            'HAVE',
            'INTO',
            'SAY',
            'HAD',
            'THE',  
            'FOR',  
            'HOW', 
            'WHY', 
            'AND',
            'WAS', 
            'WHO',
            'VIA', 
            'ARE',
            'CAN',
            'HAS',
            'ALL',
            'OUT',
            'TOO',
            'NEW',
            'ITS',
            'BY',
            'WE',
            'IN', 
            'IT',
            'ON',
            'IS',
            'AT',
            'AS',
            'TO',
            'OF',
            'SO',
            'IF',
            'BE',
            'DO',
            'GO',
            'AN',
            '-'
        ];
        let result = true;
        let capsWord = word.toUpperCase();

        //filter logic
        if (forbiddenWords.indexOf(capsWord) >= 0 || word.length === 1 || !isNaN(word) || word.slice(0, word.length - 3).toUpperCase() === 'ING') {
            result = false
        }

        //return True or False, if true CRON update includes word database record
        return result
    },
    removePunctuation: (word) => {
        return word.split('\'').join('').split('\"').join('').split(',').join('').split('?').join('').split(':').join('');
    }
}