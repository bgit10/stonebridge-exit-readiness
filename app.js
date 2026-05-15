/**
 * StoneBridge Business Advisors
 * Exit Readiness Assessment Engine
 */

const AssessmentApp = (function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    
    const CATEGORIES = [
        {
            id: 'financial',
            name: 'Financial Foundation',
            weight: 0.22,
            description: 'The quality and stability of your financial performance'
        },
        {
            id: 'transferability',
            name: 'Business Transferability',
            weight: 0.20,
            description: 'How well the business operates without you'
        },
        {
            id: 'customer',
            name: 'Customer & Revenue Quality',
            weight: 0.18,
            description: 'The durability and diversity of revenue'
        },
        {
            id: 'growth',
            name: 'Growth & Market Position',
            weight: 0.15,
            description: 'Your competitive edge and future trajectory'
        },
        {
            id: 'deal',
            name: 'Deal Readiness',
            weight: 0.13,
            description: 'Legal, valuation, and disclosure preparedness'
        },
        {
            id: 'intent',
            name: 'Owner Intent & Timeline',
            weight: 0.12,
            description: 'Your goals, experience, and timing'
        }
    ];

    // ============================================
    // QUESTIONS
    // ============================================

    const QUESTIONS = [
        // --- FINANCIAL FOUNDATION ---
        {
            id: 'q1',
            category: 'financial',
            text: 'What is your company\'s approximate annual revenue?',
            type: 'single',
            options: [
                { value: 1, label: 'Under $1M', score: 15 },
                { value: 2, label: '$1M – $3M', score: 35 },
                { value: 3, label: '$3M – $7M', score: 55 },
                { value: 4, label: '$7M – $15M', score: 75 },
                { value: 5, label: '$15M – $30M', score: 90 },
                { value: 6, label: 'Over $30M', score: 100 }
            ],
            help: null
        },
        {
            id: 'q2',
            category: 'financial',
            text: 'What is your approximate EBITDA margin?',
            type: 'single',
            options: [
                { value: 1, label: 'Negative or break-even', score: 5 },
                { value: 2, label: '1% – 5%', score: 25 },
                { value: 3, label: '5% – 10%', score: 45 },
                { value: 4, label: '10% – 15%', score: 65 },
                { value: 5, label: '15% – 20%', score: 85 },
                { value: 6, label: 'Over 20%', score: 100 }
            ],
            help: 'EBITDA = Earnings Before Interest, Taxes, Depreciation, and Amortization. It\'s roughly your operating profit &mdash; what buyers look at most closely. If you\'re unsure, use your net income plus interest, taxes, and depreciation.'
        },
        {
            id: 'q3',
            category: 'financial',
            text: 'How has your revenue trended over the past 3 years?',
            type: 'single',
            options: [
                { value: 1, label: 'Declining significantly', score: 10 },
                { value: 2, label: 'Declining slightly', score: 25 },
                { value: 3, label: 'Flat', score: 45 },
                { value: 4, label: 'Growing modestly (5-15% annually)', score: 70 },
                { value: 5, label: 'Growing strongly (15-30% annually)', score: 90 },
                { value: 6, label: 'Growing rapidly (over 30% annually)', score: 100 }
            ],
            help: null
        },
        {
            id: 'q4',
            category: 'financial',
            text: 'How would you describe the quality of your financial records?',
            type: 'single',
            options: [
                { value: 1, label: 'Informal / owner-managed books', score: 15 },
                { value: 2, label: 'Basic bookkeeping, some gaps', score: 35 },
                { value: 3, label: 'Reliable books, but not reviewed externally', score: 55 },
                { value: 4, label: 'CPA-reviewed annually', score: 75 },
                { value: 5, label: 'Audited financials, clean for 2+ years', score: 100 }
            ],
            help: null
        },

        // --- BUSINESS TRANSFERABILITY ---
        {
            id: 'q5',
            category: 'transferability',
            text: 'How involved are you in day-to-day operations?',
            type: 'single',
            options: [
                { value: 1, label: 'I run everything personally', score: 10 },
                { value: 2, label: 'I\'m involved in most key decisions daily', score: 30 },
                { value: 3, label: 'I oversee operations but delegate tasks', score: 50 },
                { value: 4, label: 'I manage managers, rarely touch daily ops', score: 75 },
                { value: 5, label: 'The business runs without me for weeks at a time', score: 100 }
            ],
            help: null
        },
        {
            id: 'q6',
            category: 'transferability',
            text: 'How documented are your processes and procedures?',
            type: 'single',
            options: [
                { value: 1, label: 'All in my head', score: 10 },
                { value: 2, label: 'Some informal notes', score: 30 },
                { value: 3, label: 'Key processes written down', score: 55 },
                { value: 4, label: 'Most processes documented and followed', score: 80 },
                { value: 5, label: 'Fully documented SOPs, regularly updated', score: 100 }
            ],
            help: null
        },
        {
            id: 'q7',
            category: 'transferability',
            text: 'How strong is your leadership team beyond you?',
            type: 'single',
            options: [
                { value: 1, label: 'There is no leadership team beyond me', score: 10 },
                { value: 2, label: 'One key lieutenant, but they\'re not ready to lead alone', score: 30 },
                { value: 3, label: 'A small leadership team with defined roles', score: 55 },
                { value: 4, label: 'Strong second-tier leadership, most could step up', score: 80 },
                { value: 5, label: 'A fully capable leadership team that runs the business', score: 100 }
            ],
            help: null
        },

        // --- CUSTOMER & REVENUE QUALITY ---
        {
            id: 'q8',
            category: 'customer',
            text: 'What percentage of revenue comes from your largest customer?',
            type: 'single',
            options: [
                { value: 1, label: 'Over 40%', score: 10 },
                { value: 2, label: '25% – 40%', score: 30 },
                { value: 3, label: '15% – 25%', score: 55 },
                { value: 4, label: '8% – 15%', score: 80 },
                { value: 5, label: 'Under 8%', score: 100 }
            ],
            help: null
        },
        {
            id: 'q9',
            category: 'customer',
            text: 'What best describes your revenue model?',
            type: 'single',
            options: [
                { value: 1, label: 'Mostly one-time / project-based work', score: 20 },
                { value: 2, label: 'Mix of recurring and project revenue', score: 50 },
                { value: 3, label: 'Subscription or retainer-based', score: 80 },
                { value: 4, label: 'Long-term contracts with high renewal rates', score: 100 }
            ],
            help: null
        },
        {
            id: 'q10',
            category: 'customer',
            text: 'How many active customers or accounts do you serve?',
            type: 'single',
            options: [
                { value: 1, label: 'Fewer than 10', score: 20 },
                { value: 2, label: '10 – 25', score: 45 },
                { value: 3, label: '25 – 75', score: 70 },
                { value: 4, label: '75 – 200', score: 90 },
                { value: 5, label: 'Over 200', score: 100 }
            ],
            help: null
        },

        // --- GROWTH & MARKET POSITION ---
        {
            id: 'q11',
            category: 'growth',
            text: 'How would you describe your competitive position?',
            type: 'single',
            options: [
                { value: 1, label: 'Commodity provider, compete mainly on price', score: 15 },
                { value: 2, label: 'Some differentiation, but competitors are close', score: 35 },
                { value: 3, label: 'Clear differentiation in a niche', score: 60 },
                { value: 4, label: 'Recognized leader in our segment', score: 85 },
                { value: 5, label: 'Dominant market position with strong moats', score: 100 }
            ],
            help: null
        },
        {
            id: 'q12',
            category: 'growth',
            text: 'What best describes your growth engine?',
            type: 'single',
            options: [
                { value: 1, label: 'Most growth comes from my personal hustle', score: 15 },
                { value: 2, label: 'Some systems, but still heavily owner-dependent', score: 35 },
                { value: 3, label: 'Marketing and sales systems in place', score: 60 },
                { value: 4, label: 'Scalable systems driving consistent growth', score: 85 },
                { value: 5, label: 'Proven, repeatable growth engine with clear metrics', score: 100 }
            ],
            help: null
        },
        {
            id: 'q13',
            category: 'growth',
            text: 'How is your total addressable market trending?',
            type: 'single',
            options: [
                { value: 1, label: 'Shrinking or being disrupted', score: 20 },
                { value: 2, label: 'Flat or mature', score: 45 },
                { value: 3, label: 'Growing modestly', score: 70 },
                { value: 4, label: 'Growing strongly', score: 90 },
                { value: 5, label: 'Expanding rapidly with tailwinds', score: 100 }
            ],
            help: null
        },

        // --- DEAL READINESS ---
        {
            id: 'q14',
            category: 'deal',
            text: 'Have you had a formal business valuation in the past 2 years?',
            type: 'single',
            options: [
                { value: 1, label: 'No, never had one', score: 20 },
                { value: 2, label: 'Had one, but over 2 years ago', score: 50 },
                { value: 3, label: 'Yes, within the past 2 years', score: 100 }
            ],
            help: null
        },
        {
            id: 'q15',
            category: 'deal',
            text: 'How would you describe your legal and corporate records?',
            type: 'single',
            options: [
                { value: 1, label: 'Needs significant work', score: 15 },
                { value: 2, label: 'Mostly in place, some gaps', score: 45 },
                { value: 3, label: 'Organized and current', score: 75 },
                { value: 4, label: 'Impeccable, audit-ready', score: 100 }
            ],
            help: 'This includes corporate formation docs, cap table, contracts, IP assignments, employment agreements, and compliance records.'
        },
        {
            id: 'q16',
            category: 'deal',
            text: 'Are there any known liabilities, disputes, or "skeletons" that would surface in due diligence?',
            type: 'single',
            options: [
                { value: 1, label: 'Yes, there are material issues', score: 15 },
                { value: 2, label: 'Some minor items that could be resolved', score: 50 },
                { value: 3, label: 'Nothing material I\'m aware of', score: 100 }
            ],
            help: 'Buyers will find everything. Transparency now prevents surprises later.'
        },

        // --- OWNER INTENT & TIMELINE ---
        {
            id: 'q17',
            category: 'intent',
            text: 'What is your target exit timeline?',
            type: 'single',
            options: [
                { value: 1, label: 'Within 12 months', score: 50 },
                { value: 2, label: '1 – 3 years', score: 85 },
                { value: 3, label: '3 – 5 years', score: 100 },
                { value: 4, label: 'Just exploring, no firm timeline', score: 60 }
            ],
            help: null
        },
        {
            id: 'q18',
            category: 'intent',
            text: 'What is your primary exit goal?',
            type: 'single',
            options: [
                { value: 1, label: 'Maximize price', score: 90 },
                { value: 2, label: 'Protect employees and team', score: 80 },
                { value: 3, label: 'Preserve legacy and brand', score: 75 },
                { value: 4, label: 'Speed and simplicity', score: 55 }
            ],
            help: null
        },
    ];

    // ============================================
    // INSIGHTS ENGINE
    // ============================================

    const INSIGHTS = {
        financial: {
            excellent: [
                "Your financial profile is a genuine asset. Strong margins, clean records, and consistent growth create immediate buyer confidence and support premium multiples.",
                "This is the foundation of a compelling sale narrative. Buyers will pay more for businesses where they can trust the numbers from day one."
            ],
            good: [
                "Your financials are solid, but there's room to sharpen the story. Consider whether a formal quality of earnings analysis could surface any hidden strengths.",
                "The fundamentals are here. Focus on documenting the \"why\" behind the numbers to help buyers see the trajectory."
            ],
            fair: [
                "Your financial performance is adequate, but it's likely the first area buyers will probe. Consider a 12-month sprint to clean up records and improve visibility.",
                "Weak financial documentation is the #1 reason deals lose momentum. This is your highest-return preparation investment."
            ],
            needsWork: [
                "This category needs attention before going to market. Buyers discount heavily for unclear or declining financials.",
                "Consider engaging a CFO or financial consultant to stabilize and document performance. A 12-24 month runway could transform your outcome."
            ]
        },
        transferability: {
            excellent: [
                "Your business is genuinely transferable — a rare and valuable trait. Buyers will compete more aggressively knowing the founder isn't a dependency.",
                "This level of operational independence often commands a strategic premium. Highlight this strength in your marketing materials."
            ],
            good: [
                "You're on the right path, but there's likely still owner dependency in key decisions or relationships. Document what's in your head.",
                "A buyer will want to see that key customer relationships and strategic decisions can survive your departure."
            ],
            fair: [
                "Owner dependency is one of the biggest value killers in the lower middle market. Buyers see risk when the founder is the business.",
                "Start delegating key decisions and documenting processes now. Even 12 months of progress here can meaningfully improve your multiple."
            ],
            needsWork: [
                "This is likely your biggest value risk. A business that can't run without its founder is extremely difficult to sell at a respectable multiple.",
                "Building a leadership team and documenting processes should be your #1 priority. Consider it a 18-24 month investment in your exit price."
            ]
        },
        customer: {
            excellent: [
                "Your revenue profile is exactly what sophisticated buyers seek: diversified, recurring, and durable. This supports premium valuations.",
                "Customer concentration risk is minimal, and your recurring revenue provides predictability that buyers pay up for."
            ],
            good: [
                "Your customer base is reasonably healthy, but look for opportunities to deepen relationships and increase contract lengths.",
                "Consider whether you can convert more project revenue to recurring, or diversify away from any customer over 15% of revenue."
            ],
            fair: [
                "Revenue concentration or project dependency creates real risk in a buyer's eyes. They'll discount for customers who might leave with you.",
                "Focus on formalizing relationships with contracts and expanding your customer base. These efforts pay dividends at sale time."
            ],
            needsWork: [
                "Heavy customer concentration or transactional revenue makes buyers nervous. They'll worry about revenue dropping the day you leave.",
                "This is a fixable problem, but it takes time. Start diversifying now and formalizing customer relationships through contracts."
            ]
        },
        growth: {
            excellent: [
                "You're in a strong market position with real competitive advantages. Buyers pay premiums for businesses with defendable moats and growth runways.",
                "Your growth engine looks scalable and not dependent on heroic founder effort. That's rare and valuable."
            ],
            good: [
                "You have a solid market position, but buyers will want to understand why growth will continue under new ownership.",
                "Consider articulating your growth thesis more clearly: what specific investments or strategies will drive the next chapter?"
            ],
            fair: [
                "Buyers may see your business as stable but not exciting. In a competitive sale process, growth potential is what drives competition.",
                "Look for one or two high-confidence growth initiatives you can point to as proof of future trajectory."
            ],
            needsWork: [
                "A shrinking or commoditized market makes buyers cautious. They'll need to believe there's a path to growth under their ownership.",
                "Consider whether there are adjacent markets, service lines, or operational improvements that could reframe the growth story."
            ]
        },
        deal: {
            excellent: [
                "Your deal readiness is outstanding. A recent valuation and clean records mean you can move quickly when the right opportunity arises.",
                "This level of preparedness signals professionalism to buyers and often accelerates the process significantly."
            ],
            good: [
                "You're in decent shape, but a few gaps remain. A pre-sale legal review and updated valuation could close them efficiently.",
                "Buyers appreciate sellers who've done their homework. The more prepared you are, the smoother due diligence goes."
            ],
            fair: [
                "Legal and record-keeping gaps are common but costly. Buyers use them to renegotiate price during due diligence.",
                "Engage a corporate attorney to audit your records now. It's far cheaper to fix issues before buyers find them."
            ],
            needsWork: [
                "Material legal issues or poor records can kill deals entirely. This category requires immediate professional attention.",
                "Before considering a sale, you need a clean corporate and legal foundation. Start with a full legal audit."
            ]
        },
        intent: {
            excellent: [
                "Your timeline and experience position you well. You understand the process and have realistic expectations about what it takes.",
                "Use this time advantage wisely. The more prepared you are, the stronger your negotiating position."
            ],
            good: [
                "You have a reasonable timeline and clear goals. Now it's about aligning your preparation with those goals.",
                "If price maximization is key, prioritize financial performance and transferability. If speed matters, lean into deal readiness."
            ],
            fair: [
                "Your timeline may feel comfortable, but preparation often takes longer than owners expect. Start sooner than you think necessary.",
                "First-time sellers benefit enormously from early advisor engagement. Consider a conversation even if you're 2-3 years out."
            ],
            needsWork: [
                "An accelerated timeline combined with limited M&A experience can lead to costly mistakes. Be realistic about what's achievable.",
                "If you need to exit quickly, focus ruthlessly on the 2-3 factors that will most impact buyer interest and price."
            ]
        }
    };

    // ============================================
    // ACTION ITEMS ENGINE
    // ============================================

    function generateActionItems(answers, scores) {
        const items = [];
        const catScores = scores.categories;

        // Financial actions
        if (catScores.financial < 50) {
            items.push({
                priority: 'high',
                category: 'Financial Foundation',
                text: 'Engage a CPA or CFO consultant to clean up and formalize your financials. Buyers need 2-3 years of reliable records.'
            });
        } else if (catScores.financial < 70) {
            items.push({
                priority: 'medium',
                category: 'Financial Foundation',
                text: 'Consider a quality of earnings analysis to surface any adjustments that could improve your EBITDA presentation.'
            });
        }

        // Transferability actions
        if (catScores.transferability < 50) {
            items.push({
                priority: 'high',
                category: 'Business Transferability',
                text: 'Start building a leadership team and documenting key processes. This is your highest-leverage value driver.'
            });
        } else if (catScores.transferability < 75) {
            items.push({
                priority: 'medium',
                category: 'Business Transferability',
                text: 'Test your independence: take a 2-week vacation and see what breaks. Fix what surfaces.'
            });
        }

        // Customer actions
        if (catScores.customer < 50) {
            items.push({
                priority: 'high',
                category: 'Customer & Revenue',
                text: 'Diversify your customer base and move key accounts to formal contracts. No customer should be over 20% of revenue.'
            });
        } else if (catScores.customer < 70 && answers.q9 <= 2) {
            items.push({
                priority: 'medium',
                category: 'Customer & Revenue',
                text: 'Look for ways to convert project revenue into recurring or retainer relationships. Predictability commands premiums.'
            });
        }

        // Growth actions
        if (catScores.growth < 50) {
            items.push({
                priority: 'medium',
                category: 'Growth & Market',
                text: 'Articulate a clear growth thesis. Even modest, credible growth plans make businesses more attractive than flat ones.'
            });
        }

        // Deal readiness actions
        if (catScores.deal < 50) {
            items.push({
                priority: 'high',
                category: 'Deal Readiness',
                text: 'Conduct a legal and corporate records audit. Fix issues now before they become buyer negotiating leverage.'
            });
        } else if (catScores.deal < 75) {
            items.push({
                priority: 'medium',
                category: 'Deal Readiness',
                text: 'Get a formal business valuation. Knowing your number gives you power in negotiations and reveals prep gaps.'
            });
        }

        // Timeline actions
        if (answers.q17 === 1 && scores.overall < 65) {
            items.push({
                priority: 'high',
                category: 'Timeline',
                text: 'Your 12-month timeline may be aggressive given your readiness score. Consider whether delaying 12-18 months could significantly improve your outcome.'
            });
        } else if (answers.q17 === 4) {
            items.push({
                priority: 'low',
                category: 'Planning',
                text: 'Since you\'re exploring, this is the perfect time to build relationships with advisors and understand your options without pressure.'
            });
        }

        // Always add valuation if they haven't had one
        if (answers.q14 === 1) {
            items.push({
                priority: 'medium',
                category: 'Valuation',
                text: 'Get a formal business valuation. It\'s the single best investment you can make in understanding your position.'
            });
        }

        // Sort by priority and return top 5
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        items.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        return items.slice(0, 5);
    }

    // ============================================
    // BUYER PERSPECTIVE ENGINE
    // ============================================

    function generateBuyerPerspective(answers, scores, actionItems) {
        const parts = [];
        const overall = scores.overall;
        const cat = scores.categories;

        // Opening framing
        if (overall >= 80) {
            parts.push("A sophisticated buyer would view this as an attractive, well-prepared acquisition target.");
        } else if (overall >= 60) {
            parts.push("A sophisticated buyer would see real value here, but with identifiable risks that will affect price and deal structure.");
        } else if (overall >= 40) {
            parts.push("A sophisticated buyer would see potential, but would approach with caution and likely seek protective terms or a lower multiple.");
        } else {
            parts.push("A sophisticated buyer would likely pass or submit a deeply discounted offer, seeing too much execution risk.");
        }

        // Specific strengths
        const strengths = [];
        if (cat.financial >= 70) strengths.push("solid financial performance");
        if (cat.transferability >= 70) strengths.push("low owner dependency");
        if (cat.customer >= 70) strengths.push("durable revenue base");
        if (cat.growth >= 70) strengths.push("strong market position");
        if (cat.deal >= 70) strengths.push("clean corporate records");

        if (strengths.length > 0) {
            parts.push(`The primary strengths are ${strengths.slice(0, -1).join(", ")}${strengths.length > 1 ? " and " : ""}${strengths[strengths.length - 1]}.`);
        }

        // Specific concerns
        const concerns = [];
        if (cat.financial < 50) concerns.push("financial performance and documentation");
        if (cat.transferability < 50) concerns.push("heavy owner dependence");
        if (cat.customer < 50) concerns.push("customer concentration or revenue quality");
        if (cat.growth < 50) concerns.push("market position and growth outlook");
        if (cat.deal < 50) concerns.push("legal and corporate readiness");

        if (concerns.length > 0) {
            parts.push(`Key concerns will center on ${concerns.slice(0, -1).join(", ")}${concerns.length > 1 ? " and " : ""}${concerns[concerns.length - 1]}.`);
        }

        // Valuation impact
        if (overall >= 75) {
            parts.push("With focused preparation, this business could command an above-market multiple from the right strategic or financial buyer.");
        } else if (overall >= 55) {
            parts.push("Addressing the priority gaps identified above could meaningfully improve buyer interest and valuation within 12-18 months.");
        } else {
            parts.push("Significant preparation work is recommended before engaging buyers. Rushing to market now would likely leave substantial value on the table.");
        }

        return parts.join(" ");
    }

    // ============================================
    // VALUATION ENGINE
    // ============================================

    function calculateValuation(answers) {
        const revenueMap = {
            1: 750000,   // Under $1M - use midpoint-ish
            2: 2000000,  // $1M-$3M
            3: 5000000,  // $3M-$7M
            4: 11000000, // $7M-$15M
            5: 22500000, // $15M-$30M
            6: 40000000  // Over $30M
        };

        const ebitdaMarginMap = {
            1: 0.02,  // Negative/break-even
            2: 0.03,  // 1-5%
            3: 0.075, // 5-10%
            4: 0.125, // 10-15%
            5: 0.175, // 15-20%
            6: 0.22   // Over 20%
        };

        const revenue = revenueMap[answers.q1] || 5000000;
        const margin = ebitdaMarginMap[answers.q2] || 0.10;
        const ebitda = revenue * margin;

        // Base multiple range by revenue size
        let baseLow = 3.0, baseHigh = 5.0;
        if (revenue < 1000000) { baseLow = 2.0; baseHigh = 3.5; }
        else if (revenue < 3000000) { baseLow = 2.5; baseHigh = 4.0; }
        else if (revenue < 7000000) { baseLow = 3.0; baseHigh = 5.0; }
        else if (revenue < 15000000) { baseLow = 3.5; baseHigh = 6.0; }
        else if (revenue < 30000000) { baseLow = 4.0; baseHigh = 7.0; }
        else { baseLow = 4.5; baseHigh = 8.0; }

        // Adjustments based on readiness score components
        let lowAdj = 0, highAdj = 0;

        // Revenue trend
        if (answers.q3 >= 5) { lowAdj += 0.5; highAdj += 1.0; }
        else if (answers.q3 >= 4) { lowAdj += 0.3; highAdj += 0.5; }
        else if (answers.q3 <= 2) { lowAdj -= 0.5; highAdj -= 1.0; }

        // Financial records quality
        if (answers.q4 >= 5) { lowAdj += 0.3; highAdj += 0.5; }
        else if (answers.q4 <= 2) { lowAdj -= 0.5; highAdj -= 0.8; }

        // Owner involvement
        if (answers.q5 >= 5) { lowAdj += 0.5; highAdj += 1.0; }
        else if (answers.q5 <= 2) { lowAdj -= 0.8; highAdj -= 1.5; }

        // Customer concentration
        if (answers.q8 >= 5) { lowAdj += 0.3; highAdj += 0.5; }
        else if (answers.q8 <= 2) { lowAdj -= 0.5; highAdj -= 1.0; }

        // Revenue type
        if (answers.q9 >= 4) { lowAdj += 0.5; highAdj += 1.0; }
        else if (answers.q9 <= 2) { lowAdj -= 0.3; highAdj -= 0.5; }

        // Competitive position
        if (answers.q11 >= 4) { lowAdj += 0.5; highAdj += 1.0; }
        else if (answers.q11 <= 2) { lowAdj -= 0.5; highAdj -= 1.0; }

        // Growth engine
        if (answers.q12 >= 4) { lowAdj += 0.3; highAdj += 0.8; }
        else if (answers.q12 <= 2) { lowAdj -= 0.5; highAdj -= 0.8; }

        // Market trend
        if (answers.q13 >= 4) { lowAdj += 0.3; highAdj += 0.5; }
        else if (answers.q13 <= 2) { lowAdj -= 0.5; highAdj -= 1.0; }

        // Deal readiness
        if (answers.q15 >= 4) { lowAdj += 0.2; highAdj += 0.3; }
        else if (answers.q15 <= 2) { lowAdj -= 0.3; highAdj -= 0.5; }

        // Liabilities
        if (answers.q16 === 3) { lowAdj += 0.3; highAdj += 0.5; }
        else if (answers.q16 === 1) { lowAdj -= 1.0; highAdj -= 2.0; }

        const finalLow = Math.max(1.5, baseLow + lowAdj);
        const finalHigh = Math.max(finalLow + 0.5, baseHigh + highAdj);

        const valLow = ebitda * finalLow;
        const valHigh = ebitda * finalHigh;

        return {
            revenue,
            ebitda,
            multipleLow: finalLow,
            multipleHigh: finalHigh,
            rangeLow: valLow,
            rangeHigh: valHigh
        };
    }

    // ============================================
    // STATE
    // ============================================

    let currentQuestionIndex = 0;
    let answers = {};
    let radarChartInstance = null;

    // ============================================
    // DOM REFERENCES
    // ============================================

    function getEl(id) {
        return document.getElementById(id);
    }

    // ============================================
    // NAVIGATION
    // ============================================

    function showSection(sectionId) {
        ['landing-section', 'assessment-section', 'results-section'].forEach(id => {
            const el = getEl(id);
            if (id === sectionId) {
                el.classList.remove('hidden');
                el.classList.add('animate-fade-in');
            } else {
                el.classList.add('hidden');
                el.classList.remove('animate-fade-in');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function startAssessment() {
        currentQuestionIndex = 0;
        answers = {};
        showSection('assessment-section');
        renderQuestion();
        updateProgress();
        lucide.createIcons();
    }

    function restartAssessment() {
        currentQuestionIndex = 0;
        answers = {};
        showSection('landing-section');
    }

    // ============================================
    // QUESTION RENDERING
    // ============================================

    function renderQuestion() {
        const question = QUESTIONS[currentQuestionIndex];
        const container = getEl('question-container');
        const nextBtn = getEl('next-btn');
        const backBtn = getEl('back-btn');

        // Build question HTML
        let html = `
            <div class="question-enter flex-1 flex flex-col">
                <div class="mb-8">
                    <span class="text-xs uppercase tracking-wider text-warm-600 font-semibold mb-2 block">
                        ${CATEGORIES.find(c => c.id === question.category).name}
                    </span>
                    <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stonebridge-900 dark:text-white leading-tight">
                        ${question.text}
                    </h3>
                    ${question.help ? `
                        <div class="tooltip-trigger inline-flex items-center gap-1.5 mt-3 text-sm text-stonebridge-500 dark:text-stonebridge-400 hover:text-stonebridge-700 dark:hover:text-stonebridge-300 transition-colors">
                            <i data-lucide="help-circle" class="w-4 h-4"></i>
                            <span class="border-b border-dotted border-current">What is this?</span>
                            <div class="tooltip-content">
                                ${question.help}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="space-y-3 flex-1">
        `;

        question.options.forEach((opt, idx) => {
            const selected = answers[question.id] === opt.value ? 'selected' : '';
            html += `
                <div class="option-card ${selected}" onclick="app.selectOption('${question.id}', ${opt.value})" tabindex="0" role="radio" aria-checked="${selected ? 'true' : 'false'}">
                    <div class="radio-indicator"></div>
                    <div>
                        <div class="option-text">${opt.label}</div>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`;
        container.innerHTML = html;

        // Update button states
        nextBtn.disabled = !answers.hasOwnProperty(question.id);
        backBtn.classList.toggle('hidden', currentQuestionIndex === 0);

        lucide.createIcons();
    }

    function selectOption(questionId, value) {
        answers[questionId] = value;

        // Update UI
        const cards = document.querySelectorAll('.option-card');
        cards.forEach((card, idx) => {
            const optValue = QUESTIONS[currentQuestionIndex].options[idx].value;
            if (optValue === value) {
                card.classList.add('selected');
                card.setAttribute('aria-checked', 'true');
            } else {
                card.classList.remove('selected');
                card.setAttribute('aria-checked', 'false');
            }
        });

        getEl('next-btn').disabled = false;
    }

    function goNext() {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
            updateProgress();
        } else {
            showResults();
        }
    }

    function goBack() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
            updateProgress();
        }
    }

    // ============================================
    // PROGRESS
    // ============================================

    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
        getEl('progress-bar').style.width = progress + '%';
        getEl('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${QUESTIONS.length}`;

        const currentCat = QUESTIONS[currentQuestionIndex].category;
        const catNames = CATEGORIES.map(c => c.name);
        const catIds = CATEGORIES.map(c => c.id);
        const currentCatIndex = catIds.indexOf(currentCat);

        getEl('category-label').textContent = CATEGORIES.find(c => c.id === currentCat).name;

        // Category dots
        const dotsContainer = getEl('category-dots');
        dotsContainer.innerHTML = '';
        CATEGORIES.forEach((cat, idx) => {
            const dot = document.createElement('div');
            dot.className = 'category-dot';
            if (idx < currentCatIndex) {
                dot.classList.add('complete');
            } else if (idx === currentCatIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.add('pending');
            }
            dot.title = cat.name;
            dotsContainer.appendChild(dot);
        });
    }

    // ============================================
    // SCORING
    // ============================================

    function calculateScores() {
        const categoryScores = {};
        const categoryMax = {};

        // Initialize
        CATEGORIES.forEach(c => {
            categoryScores[c.id] = 0;
            categoryMax[c.id] = 0;
        });

        // Sum raw scores
        QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            const option = q.options.find(o => o.value === answer);
            if (option) {
                categoryScores[q.category] += option.score;
                categoryMax[q.category] += 100;
            }
        });

        // Normalize to 0-100 per category
        const normalizedScores = {};
        CATEGORIES.forEach(c => {
            const count = QUESTIONS.filter(q => q.category === c.id).length;
            normalizedScores[c.id] = categoryScores[c.id] / count;
        });

        // Weighted overall
        let overall = 0;
        CATEGORIES.forEach(c => {
            overall += normalizedScores[c.id] * c.weight;
        });

        return {
            overall: Math.round(overall),
            categories: normalizedScores,
            raw: categoryScores
        };
    }

    function getTier(score) {
        if (score >= 85) return { name: 'Optimized for Exit', class: 'tier-optimized', desc: 'Your business is well-positioned for a successful exit. Focus on finding the right buyer and negotiating the best terms.' };
        if (score >= 65) return { name: 'Exit Ready', class: 'tier-ready', desc: 'You\'re in strong shape. A few targeted improvements could meaningfully increase your valuation and buyer interest.' };
        if (score >= 40) return { name: 'Building Momentum', class: 'tier-building', desc: 'You have a solid foundation, but meaningful preparation work remains. The good news: most of it is fixable with time.' };
        return { name: 'Early Stage', class: 'tier-early', desc: 'There\'s significant work ahead before this business is ready for market. Start with the highest-priority gaps identified below.' };
    }

    function getInsightLevel(score) {
        if (score >= 75) return 'excellent';
        if (score >= 55) return 'good';
        if (score >= 35) return 'fair';
        return 'needsWork';
    }

    function getScoreLabel(score) {
        if (score >= 75) return { text: 'Strong', class: 'excellent' };
        if (score >= 55) return { text: 'Good', class: 'good' };
        if (score >= 35) return { text: 'Fair', class: 'fair' };
        return { text: 'Needs Work', class: 'needs-work' };
    }

    // ============================================
    // RESULTS RENDERING
    // ============================================

    function showResults() {
        showSection('results-section');
        const scores = calculateScores();
        const tier = getTier(scores.overall);
        const valuation = calculateValuation(answers);
        const actionItems = generateActionItems(answers, scores);
        const buyerPerspective = generateBuyerPerspective(answers, scores, actionItems);

        // Animate score
        animateScore(scores.overall);

        // Tier badge
        const badge = getEl('tier-badge');
        badge.className = `tier-badge ${tier.class}`;
        badge.innerHTML = `<i data-lucide="shield" class="w-4 h-4"></i> ${tier.name}`;

        // Tier description
        getEl('tier-description').textContent = tier.desc;

        // Category insights
        const insightsContainer = getEl('category-insights');
        insightsContainer.innerHTML = '';

        CATEGORIES.forEach((cat, idx) => {
            const score = Math.round(scores.categories[cat.id]);
            const level = getInsightLevel(score);
            const label = getScoreLabel(score);
            const insightText = INSIGHTS[cat.id][level][Math.floor(Math.random() * INSIGHTS[cat.id][level].length)];

            const card = document.createElement('div');
            card.className = `insight-card stagger-${idx + 1} animate-fade-in-up`;
            card.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-semibold text-stonebridge-800 dark:text-stonebridge-200">${cat.name}</h4>
                    <span class="insight-score ${label.class}">${label.text} &middot; ${score}/100</span>
                </div>
                <p class="text-sm text-stonebridge-600 dark:text-stonebridge-400 leading-relaxed">${insightText}</p>
            `;
            insightsContainer.appendChild(card);
        });

        // Action items
        const actionsContainer = getEl('action-items');
        actionsContainer.innerHTML = '';
        actionItems.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = `action-item stagger-${idx + 1} animate-fade-in-up`;
            div.innerHTML = `
                <div class="action-priority ${item.priority}">${idx + 1}</div>
                <div>
                    <div class="text-sm font-semibold text-white/90 mb-1">${item.category}</div>
                    <div class="text-sm text-stonebridge-300 leading-relaxed">${item.text}</div>
                </div>
            `;
            actionsContainer.appendChild(div);
        });

        // Buyer perspective
        getEl('buyer-perspective').textContent = buyerPerspective;

        // Valuation
        const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        getEl('val-revenue').textContent = fmt.format(valuation.revenue);
        getEl('val-ebitda').textContent = fmt.format(valuation.ebitda);
        getEl('val-range').textContent = `${fmt.format(valuation.rangeLow)} – ${fmt.format(valuation.rangeHigh)}`;

        // Radar chart
        renderRadarChart(scores.categories);

        lucide.createIcons();
    }

    function animateScore(targetScore) {
        const el = getEl('score-number');
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const currentScore = Math.round(easeProgress * targetScore);
            el.textContent = currentScore;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function renderRadarChart(categoryScores) {
        const ctx = getEl('radar-chart').getContext('2d');
        const isDark = document.documentElement.classList.contains('dark');

        if (radarChartInstance) {
            radarChartInstance.destroy();
        }

        const labels = CATEGORIES.map(c => c.name);
        const data = CATEGORIES.map(c => Math.round(categoryScores[c.id]));

        const colors = isDark ? {
            fill: 'rgba(249, 115, 22, 0.15)',
            stroke: '#f97316',
            point: '#f97316',
            pointBorder: '#1e293b',
            grid: '#334155',
            angleLines: '#334155',
            pointLabels: '#94a3b8',
            tickLabels: '#94a3b8',
            tooltipBg: '#f8fafc',
            tooltipText: '#1e293b'
        } : {
            fill: 'rgba(194, 65, 12, 0.12)',
            stroke: '#c2410c',
            point: '#c2410c',
            pointBorder: '#fff',
            grid: '#e2e8f0',
            angleLines: '#e2e8f0',
            pointLabels: '#475569',
            tickLabels: '#94a3b8',
            tooltipBg: '#1e293b',
            tooltipText: '#e2e8f0'
        };

        radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Your Score',
                    data: data,
                    backgroundColor: colors.fill,
                    borderColor: colors.stroke,
                    borderWidth: 2,
                    pointBackgroundColor: colors.point,
                    pointBorderColor: colors.pointBorder,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        ticks: {
                            stepSize: 25,
                            backdropColor: 'transparent',
                            color: colors.tickLabels,
                            font: { size: 11, family: 'Inter' }
                        },
                        grid: {
                            color: colors.grid
                        },
                        angleLines: {
                            color: colors.angleLines
                        },
                        pointLabels: {
                            color: colors.pointLabels,
                            font: { size: 12, weight: '500', family: 'Inter' }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: colors.tooltipBg,
                        titleColor: colors.tooltipText,
                        bodyColor: colors.tooltipText,
                        titleFont: { family: 'Inter', size: 13 },
                        bodyFont: { family: 'Inter', size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.raw + '/100';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    document.addEventListener('keydown', function(e) {
        const assessmentVisible = !getEl('assessment-section').classList.contains('hidden');
        if (!assessmentVisible) return;

        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused && focused.classList.contains('option-card')) {
                e.preventDefault();
                focused.click();
            }
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const cards = Array.from(document.querySelectorAll('.option-card'));
            if (cards.length === 0) return;
            const focused = document.activeElement;
            const currentIndex = cards.indexOf(focused);
            let nextIndex;

            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            }

            e.preventDefault();
            cards[nextIndex].focus();
        }
    });

    // ============================================
    // THEME MANAGEMENT
    // ============================================

    function initTheme() {
        const stored = localStorage.getItem('sba-theme');
        if (stored === 'dark' || stored === 'light') {
            applyTheme(stored);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }

    function applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('sba-theme', theme);

        // Re-render chart if it exists and results are visible
        if (radarChartInstance && !getEl('results-section').classList.contains('hidden')) {
            const scores = calculateScores();
            renderRadarChart(scores.categories);
        }
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
        lucide.createIcons();
    }

    // ============================================
    // PUBLIC API
    // ============================================

    return {
        startAssessment,
        restartAssessment,
        selectOption,
        goNext,
        goBack,
        toggleTheme,
        initTheme
    };

})();

// Expose to global scope for HTML onclick handlers
window.app = AssessmentApp;

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    AssessmentApp.initTheme();
    lucide.createIcons();
});
