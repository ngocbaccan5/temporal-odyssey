/* ════════════════════════════════
   DATA
════════════════════════════════ */
const CATS = {
  myth: {
    label:'🪘 Huyền Thoại', diff:'⭐ DỄ', diffDesc:'Kể chuyện tương tác — chọn nhánh câu chuyện, không giới hạn thời gian.',
    mode:'story', icon:'🪘', xpMult:1,
    rewards:[
      {em:'🪘',name:'Rồng Thiêng',locked:false},
      {em:'🧿',name:'Pháp Sư',locked:true},
      {em:'🌀',name:'Thủy Thần',locked:true},
      {em:'⛰️',name:'Sơn Thần',locked:true},
    ],
    eras:[
      {label:'Thần Thoại Sáng Thế', yr:'Khởi Thủy', events:['laclong','autien','sontinhts','andvuong','m_trongthu','m_chunong']},
      {label:'Thời Hùng Vương', yr:'2879–258 TCN', events:['m_hungvuong','m_giongphu','m_cholua','m_maiden','m_trungquoc','m_phongtho']},
      {label:'Huyền Sử Cổ Đại', yr:'257–179 TCN', events:['m_coloa','m_nothanbao','m_mychau','m_tuongda','m_rua','m_than']},
      {label:'Thần Linh & Phép Thuật', yr:'Huyền Thoại', events:['m_ongdong','m_bachu','m_phucuc','m_tiensau','m_dragonking','m_jade']},
      {label:'Truyền Thuyết Dân Gian', yr:'Dân Gian', events:['m_tamcam','m_thachsamh','m_camrong','m_trongsong','m_honvong','m_cheoleo','mythlock1','mythlock2','mythlock3']},
    ]
  },
  battle: {
    label:'🏹 Chiến Trận', diff:'⭐⭐ TRUNG BÌNH', diffDesc:'Quiz tốc độ có đếm giờ — trả lời nhanh để nhân điểm x2!',
    mode:'battle', icon:'🏹', xpMult:2,
    rewards:[
      {em:'🗡️',name:'Chiến Thắng',locked:false},
      {em:'🛡',name:'Thần Khiên',locked:true},
      {em:'🎗️',name:'Huân Chương',locked:true},
      {em:'🏆',name:'Đại Tướng',locked:true},
    ],
    eras:[
      {label:'Thời Bắc Thuộc', yr:'40–938 SCN', events:['haiba','b_trungvu','b_trieuhoa','b_lynam','b_khuchua']},
      {label:'Độc Lập & Thống Nhất', yr:'938–1010', events:['bachang','dinhtien','b_ledai','b_ngoquyen2']},
      {label:'Chiến Tranh Phong Kiến', yr:'1010–1427', events:['b_lythuong','b_trandao','b_hatitran','b_chilang','b_lamson','battlock1']},
    ]
  },
  dynasty: {
    label:'🏺 Triều Đại', diff:'⭐⭐⭐ KHÓ', diffDesc:'Sắp xếp các triều đại/sự kiện theo đúng thứ tự thời gian.',
    mode:'timeline', icon:'🏺', xpMult:3,
    rewards:[
      {em:'🏺',name:'Vương Miện',locked:false},
      {em:'📋',name:'Ngọc Phả',locked:true},
      {em:'🏯',name:'Hoàng Thành',locked:true},
      {em:'💠',name:'Ngọc Tỷ',locked:true},
    ],
    eras:[
      {label:'Các Vương Triều Sơ Kỳ', yr:'968–1225', events:['dinh968','ly1009','d_tienle']},
      {label:'Triều Đại Cực Thịnh', yr:'1225–1788', events:['tran1226','le1428','d_macmac','d_tayon']},
      {label:'Cận Đại', yr:'1802–1945', events:['d_nguyen','d_phapthuan','d_cachtang','dynlock1']},
    ]
  }
};

const LACLONG_VIDEO_ROOT = '/static/assets/videos/demo/lac-long-quan-au-co/optimized';
const LACLONG_OPTIMIZED_AVAILABLE = true;
const LACLONG_VIDEOS = {
  a: {
    url: LACLONG_VIDEO_ROOT + '/canh-a-720p.mp4',
    fallbackUrl: ''
  },
  b: {
    url: LACLONG_VIDEO_ROOT + '/canh-b-720p.mp4',
    fallbackUrl: ''
  },
  c: {
    url: LACLONG_VIDEO_ROOT + '/canh-c-720p.mp4',
    fallbackUrl: ''
  }
};

const EVS = {
  /* MYTH - story mode */
  laclong:{cat:'myth',em:'🌊',title:'Lạc Long Quân & Âu Cơ',yr:'Thời Sáng Thế',
    bg:'radial-gradient(ellipse at 50% 30%,#3a0860,#0d0118)',
    story:'Bọc trăm trứng vừa nở. Lạc Long Quân nói: "Ta là giống Rồng, nàng là giống Tiên, khó ở cùng nhau lâu được. Nay phải tính việc chia con..."',
    scene:'Lạc Long Quân và Âu Cơ phải quyết định số phận của trăm người con. Theo truyền thuyết, điều gì đã xảy ra?',
    choices:[
      {text:'🌊 "Chia đôi: 50 con theo cha xuống biển, 50 con theo mẹ lên núi, khi có việc thì giúp nhau"',
       correct:true,
       videoUrl:LACLONG_VIDEOS.a.url,
       videoFallbackUrl:LACLONG_VIDEOS.a.fallbackUrl,
       outcome:'Theo truyền thuyết, Lạc Long Quân đưa 50 người con xuống biển, Âu Cơ đưa 50 người con lên núi. Khi có việc thì giúp đỡ nhau, thể hiện nguồn gốc đoàn kết của dân tộc Việt.'},
      {text:'🏰 "Giữ tất cả 100 con lại, lập một vương quốc hùng mạnh ở đồng bằng"',
       correct:false,
       videoUrl:LACLONG_VIDEOS.b.url,
       videoFallbackUrl:LACLONG_VIDEOS.b.fallbackUrl,
       outcome:'Nếu giữ tất cả 100 người con ở đồng bằng, dân tộc sẽ không lan tỏa khắp núi rừng và biển cả. Câu chuyện mất đi ý nghĩa giải thích sự phân bố cư dân Việt và tinh thần đoàn kết giữa các vùng miền.'},
      {text:'📜 "Đem các con sang phương Bắc học hỏi văn hóa Trung Hoa rồi mới về dựng nước"',
       correct:false,
       videoUrl:LACLONG_VIDEOS.c.url,
       videoFallbackUrl:LACLONG_VIDEOS.c.fallbackUrl,
       outcome:'Đưa các con sang phương Bắc học hỏi văn hóa Trung Hoa là không đúng với tinh thần truyền thuyết. Truyện Lạc Long Quân & Âu Cơ nhấn mạnh nguồn gốc riêng, bản sắc riêng và sự gắn bó của cộng đồng người Việt.'},
    ],
    vidUrl:LACLONG_VIDEOS.a.url,
    vidFallbackUrl:LACLONG_VIDEOS.a.fallbackUrl,
    xp:25,explain:'Theo truyền thuyết, 50 người con theo cha xuống biển, 50 người con theo mẹ lên núi — giải thích sự phân bổ dân tộc Việt.'
  },
  autien:{cat:'myth',em:'🌾',title:'Sự Tích Bánh Chưng Bánh Dày',yr:'Đời Hùng Vương VI',
    bg:'radial-gradient(ellipse at 50% 30%,#1a2a10,#0d0118)',
    story:'Vua Hùng Vương thứ 6 muốn truyền ngôi cho người con nào dâng lễ vật ngon nhất trong dịp Tết. Các hoàng tử đua nhau tìm sơn hào hải vị...',
    scene:'Bạn là Lang Liêu — hoàng tử nghèo nhất, không có gì ngoài gạo nếp. Thần hiện ra trong giấc mơ bảo bạn:',
    choices:[
      {text:'🌿 Gói gạo nếp hình vuông tượng trưng cho đất (Bánh Chưng)',
       outcome:'Đúng rồi! Bánh Chưng hình vuông tượng trưng cho đất mẹ. Vua Hùng truyền ngôi cho Lang Liêu!'},
      {text:'☁️ Làm bánh tròn tượng trưng cho trời (Bánh Dày)',
       outcome:'Bạn cũng cần làm thêm bánh Chưng! Phải có cả hai để tượng trưng cho đất và trời.'},
      {text:'🏺 Đúc đồng tạo ra trống đồng Đông Sơn',
       outcome:'Trống đồng là vật thiêng, nhưng không phải lễ vật cúng Tết. Hãy nghĩ về ý nghĩa của gạo nếp...'},
    ],
    xp:25,explain:'Lang Liêu làm Bánh Chưng (hình vuông = đất) và Bánh Dày (hình tròn = trời), được truyền ngôi vua.'
  },
  sontinhts:{cat:'myth',em:'⛰️',title:'Sơn Tinh Thủy Tinh',yr:'Đời Hùng Vương XVIII',
    bg:'radial-gradient(ellipse at 50% 30%,#0a1a3a,#0d0118)',
    story:'Vua Hùng muốn kén rể. Hai chàng trai tài giỏi nhất đến cầu hôn công chúa Mị Nương...',
    scene:'Sơn Tinh và Thủy Tinh cùng đến cầu hôn. Vua Hùng ra điều kiện ai mang lễ vật đến trước. Bạn là Sơn Tinh, bạn sẽ:',
    choices:[
      {text:'⛰️ Dùng phép thuật vươn núi lên che mưa lũ',
       outcome:'Xuất sắc! Sơn Tinh dùng núi chắn lũ, bảo vệ đồng bằng. Đây là cách người Việt cổ giải thích hiện tượng lũ lụt hàng năm.'},
      {text:'🪘 Gọi rồng thiêng trợ giúp',
       outcome:'Rồng thiêng chỉ giúp con cháu Lạc Long Quân trong đại sự quốc gia. Hãy dùng sức mạnh núi non!'},
      {text:'💤 Chờ Thủy Tinh tấn công rồi phản công',
       outcome:'Bị động quá! Sơn Tinh phải chủ động nâng núi lên trước khi nước lũ kịp nhấn chìm làng mạc.'},
    ],
    xp:25,explain:'Sơn Tinh (Thần Núi) và Thủy Tinh (Thần Nước) tượng trưng cho cuộc chiến muôn đời giữa đất và nước, lũ lụt và đê điều.'
  },
  andvuong:{cat:'myth',em:'🐢',title:'An Dương Vương & Nỏ Thần',yr:'257 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0830,#0d0118)',
    story:'Vua An Dương Vương xây thành Cổ Loa kỳ diệu nhờ sự trợ giúp của Thần Rùa Kim Quy. Chiếc nỏ thần bắn một phát giết nghìn quân...',
    scene:'Triệu Đà sai con trai là Trọng Thủy sang cầu hôn Mị Châu. Bạn là An Dương Vương, đứng trước quyết định:',
    choices:[
      {text:'🤝 Đồng ý gả con gái để giữ hòa bình',
       outcome:'Sai lầm! Trọng Thủy đánh cắp lẫy nỏ thần. Khi Triệu Đà tấn công, nỏ thần không còn hiệu lực nữa. Cổ Loa thất thủ!'},
      {text:'🏹 Từ chối và thách Triệu Đà quyết chiến',
       outcome:'Dũng cảm! Với nỏ thần còn nguyên vẹn, An Dương Vương đánh bại Triệu Đà. Âu Lạc giữ vững độc lập thêm nhiều thế kỷ!'},
    ],
    xp:30,explain:'Trong lịch sử, An Dương Vương đồng ý gả Mị Châu cho Trọng Thủy — đây là bài học về cảnh giác trong ngoại giao.'
  },
  mythlock1:{cat:'myth',em:'🔒',title:'Phong Thần Diễn Nghĩa VN',yr:'???',locked:true},

  /* BATTLE - tốc độ */
  bachang:{cat:'battle',em:'🚣',title:'Trận Bạch Đằng',yr:'938 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#4a0808,#0d0102)',
    story:'Năm 938, Ngô Quyền dụ thủy quân Nam Hán vào sông Bạch Đằng rồi dùng bãi cọc gỗ bọc sắt kết hợp thủy triều tiêu diệt toàn bộ đội thuyền địch.',
    qs:[
      {q:'Ngô Quyền dùng chiến thuật nào?',opts:['Phục binh núi','Cọc gỗ + thủy triều','Hỏa công','Tấn công đêm'],ans:1,time:15},
      {q:'Trận Bạch Đằng diễn ra năm nào?',opts:['905','938','968','1076'],ans:1,time:12},
      {q:'Kết quả trận chiến?',opts:['Thua','Hòa','Thắng, chấm dứt Bắc thuộc','Thắng nhưng mất đất'],ans:2,time:10},
    ],
    xp:40,explain:'Chiến thuật cọc gỗ bọc sắt kết hợp thủy triều là thiên tài quân sự của Ngô Quyền, chấm dứt hơn 1.000 năm Bắc thuộc.'
  },
  haiba:{cat:'battle',em:'🐘',title:'Khởi Nghĩa Hai Bà Trưng',yr:'40 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0840,#0d0102)',
    story:'Năm 40 SCN, Trưng Trắc và Trưng Nhị phất cờ khởi nghĩa chống Đông Hán, thu phục hơn 65 thành trì.',
    qs:[
      {q:'Khởi nghĩa Hai Bà Trưng năm nào?',opts:['40 TCN','40 SCN','248 SCN','111 TCN'],ans:1,time:12},
      {q:'Thu phục bao nhiêu thành trì?',opts:['12','30','65','100'],ans:2,time:10},
      {q:'Đây là khởi nghĩa đặc biệt vì sao?',opts:['Lớn nhất lịch sử','Phụ nữ lãnh đạo','Chống Trung Quốc lần đầu','Dùng voi chiến'],ans:1,time:10},
    ],
    xp:40,explain:'Khởi nghĩa do hai phụ nữ lãnh đạo — hiếm có trong lịch sử thế giới thời cổ đại.'
  },
  battlock1:{cat:'battle',em:'🔒',title:'Chi Lăng – Xương Giang',yr:'1427',locked:true},
  dinhtien:{cat:'battle',em:'🏯',title:'Đinh Bộ Lĩnh Dẹp 12 Sứ Quân',yr:'968 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1a00,#0d0102)',
    story:'Sau khi Ngô Quyền mất, đất nước loạn lạc với 12 sứ quân cát cứ. Đinh Bộ Lĩnh từ thung lũng Hoa Lư đã thống nhất đất nước.',
    qs:[
      {q:'Đinh Bộ Lĩnh dẹp loạn mấy sứ quân?',opts:['8','10','12','15'],ans:2,time:12},
      {q:'Quốc hiệu do Đinh Tiên Hoàng đặt là?',opts:['Đại Việt','Đại Cồ Việt','Văn Lang','Âu Lạc'],ans:1,time:10},
      {q:'Kinh đô Đại Cồ Việt đặt tại đâu?',opts:['Thăng Long','Hoa Lư','Phú Xuân','Cổ Loa'],ans:1,time:10},
    ],
    xp:40,explain:'Đinh Bộ Lĩnh lập nhà nước Đại Cồ Việt năm 968, kinh đô Hoa Lư (Ninh Bình ngày nay).'
  },
  battlock2:{cat:'battle',em:'🔒',title:'Lý Thường Kiệt & Quân Tống',yr:'1076',locked:true},
  battlock3:{cat:'battle',em:'🔒',title:'Trần Hưng Đạo & Mông Cổ',yr:'1285',locked:true},

  /* DYNASTY - timeline */
  dinh968:{cat:'dynasty',em:'🏯',title:'Nhà Đinh — Đại Cồ Việt',yr:'968–980',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1a00,#0d0a01)',
    story:'Nhà Đinh do Đinh Tiên Hoàng lập năm 968, đặt tên nước Đại Cồ Việt. Đây là nhà nước phong kiến độc lập đầu tiên sau Bắc thuộc.',
    tlTask:'Sắp xếp các triều đại theo đúng thứ tự thành lập (cũ → mới):',
    tlItems:[
      {id:'dinh',text:'Nhà Đinh · Đại Cồ Việt',yr:'968',order:0},
      {id:'ly',  text:'Nhà Lý · Đại Việt',    yr:'1009',order:1},
      {id:'tran',text:'Nhà Trần',              yr:'1225',order:2},
      {id:'le',  text:'Nhà Lê Sơ',             yr:'1428',order:3},
    ],
    xp:60,explain:'Thứ tự đúng: Nhà Đinh (968) → Nhà Lý (1009) → Nhà Trần (1225) → Nhà Lê Sơ (1428).'
  },
  ly1009:{cat:'dynasty',em:'🌸',title:'Nhà Lý — Thăng Long',yr:'1009–1225',
    bg:'radial-gradient(ellipse at 50% 30%,#1a2a00,#0d0a01)',
    story:'Năm 1009, Lý Công Uẩn lên ngôi, lập nhà Lý, dời đô từ Hoa Lư về Thăng Long. Đây là bước ngoặt quan trọng, biến Thăng Long thành trung tâm văn minh cả ngàn năm.',
    tlTask:'Sắp xếp các sự kiện nhà Lý theo đúng thứ tự thời gian:',
    tlItems:[
      {id:'lce1',text:'Lý Công Uẩn lên ngôi',yr:'1009',order:0},
      {id:'lce2',text:'Dời đô về Thăng Long', yr:'1010',order:1},
      {id:'lce3',text:'Lý Thường Kiệt đánh Tống',yr:'1076',order:2},
      {id:'lce4',text:'Nhà Lý kết thúc',     yr:'1225',order:3},
    ],
    xp:60,explain:'Thứ tự: Lên ngôi 1009 → Dời đô 1010 → Đánh Tống 1076 → Kết thúc 1225.'
  },
  dynlock1:{cat:'dynasty',em:'🔒',title:'Nhà Trần & Ba Lần Thắng Mông Cổ',yr:'1225–1400',locked:true},
  tran1226:{cat:'dynasty',em:'🗡️',title:'Nhà Trần — Ba Lần Kháng Nguyên',yr:'1225–1400',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0a00,#0d0a01)',
    story:'Nhà Trần ba lần đánh bại quân Mông-Nguyên (1258, 1285, 1288) — kỳ tích hiếm có trong lịch sử thế giới khi một dân tộc nhỏ bé đánh bại đế quốc lớn nhất thế giới 3 lần liên tiếp.',
    tlTask:'Sắp xếp 3 cuộc kháng chiến chống Nguyên Mông theo thứ tự thời gian:',
    tlItems:[
      {id:'ng1',text:'Kháng chiến lần 1 · Trần Thủ Độ',yr:'1258',order:0},
      {id:'ng2',text:'Kháng chiến lần 2 · Trần Hưng Đạo',yr:'1285',order:1},
      {id:'ng3',text:'Trận Bạch Đằng lần 2',yr:'1288',order:2},
      {id:'ng4',text:'Nhà Trần kết thúc',yr:'1400',order:3},
    ],
    xp:60,explain:'3 lần kháng chiến: 1258, 1285, 1288. Mỗi lần đều thắng nhờ chiến thuật vườn không nhà trống và tận dụng địa hình.'
  },
  le1428:{cat:'dynasty',em:'📋',title:'Nhà Lê — Bình Ngô Đại Cáo',yr:'1428–1788',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0a20,#0d0a01)',
    story:'Năm 1428, Lê Lợi đánh đuổi giặc Minh, lên ngôi hoàng đế, Nguyễn Trãi soạn Bình Ngô Đại Cáo — bản tuyên ngôn độc lập hào hùng nhất của dân tộc.',
    tlTask:'Sắp xếp các giai đoạn kháng chiến Lam Sơn theo đúng thứ tự:',
    tlItems:[
      {id:'ls1',text:'Lê Lợi khởi nghĩa Lam Sơn', yr:'1418',order:0},
      {id:'ls2',text:'Hội thề Lũng Nhai',          yr:'1416',order:0}, /* reordered in shuffle */
      {id:'ls3',text:'Bình Ngô Đại Cáo ra đời',    yr:'1428',order:2},
      {id:'ls4',text:'Nhà Lê Sơ lên ngôi',         yr:'1428',order:3},
    ],
    xp:60,explain:'Khởi nghĩa 1418 → Hội thề Lũng Nhai 1416 (trước) → Thắng lợi → Bình Ngô Đại Cáo 1428.'
  },

  /* ═══ MYTH EXTRA EVENTS ═══ */
  m_trongthu:{cat:'myth',em:'💔',title:'Trọng Thủy & Mị Châu',yr:'179 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0840,#0d0118)',
    story:'Trọng Thủy — con trai Triệu Đà — được gửi sang Âu Lạc cầu hôn Mị Châu, con gái An Dương Vương. Thực chất là âm mưu đánh cắp nỏ thần...',
    scene:'Bạn là Mị Châu, biết chồng mình đang âm mưu. Bạn sẽ:',
    choices:[
      {text:'🪶 Tin tưởng chồng, giữ bí mật về nỏ thần',outcome:'Lòng tin khiến bạn để lộ bí mật. Trọng Thủy đánh cắp lẫy nỏ, Cổ Loa thất thủ. Mị Châu trở thành biểu tượng của tình yêu mù quáng.'},
      {text:'🏹 Báo tin cho cha, xử lý phản gián',outcome:'Dũng cảm! An Dương Vương bắt giữ Trọng Thủy. Âu Lạc giữ vững độc lập. Nhưng chiến tranh với Triệu Đà vẫn sẽ nổ ra...'},
    ],xp:30,explain:'Câu chuyện Mị Châu – Trọng Thủy là bi kịch tình yêu nổi tiếng nhất lịch sử Việt, bài học về sự cảnh giác.'
  },
  m_chunong:{cat:'myth',em:'🎋',title:'Chử Đồng Tử & Tiên Dung',yr:'Thời Hùng Vương',
    bg:'radial-gradient(ellipse at 50% 30%,#0a2a1a,#0d0118)',
    story:'Chử Đồng Tử — chàng trai nghèo chôn cha với chiếc khố duy nhất, gặp công chúa Tiên Dung khi nàng tắm trên sông Hồng...',
    scene:'Tiên Dung phát hiện Chử Đồng Tử. Bạn là nàng, bạn sẽ:',
    choices:[
      {text:'💑 Kết hôn với chàng trai nghèo theo duyên trời định',outcome:'Tiên Dung từ bỏ cung đình, sống cùng Chử Đồng Tử. Họ học phép tiên, sau được hóa thành tiên. Chuyện tình đẹp nhất dân gian Việt!'},
      {text:'👑 Trở về cung điện báo với vua cha',outcome:'Dù về cung, Tiên Dung không quên chàng trai. Vua Hùng trừng phạt nàng vì dám yêu kẻ thường dân.'},
    ],xp:25,explain:'Chử Đồng Tử là một trong Tứ Bất Tử của thần thoại Việt Nam.'
  },
  m_hungvuong:{cat:'myth',em:'👑',title:'18 Đời Vua Hùng',yr:'2879–258 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1a00,#0d0118)',
    story:'Nhà nước Văn Lang tồn tại qua 18 đời Hùng Vương, với kinh đô Phong Châu. Người dân trồng lúa nước, làm đồ đồng Đông Sơn...',
    scene:'Bạn là vị vua Hùng cuối cùng. Triệu Đà đang tấn công. Bạn sẽ:',
    choices:[
      {text:'⚔️ Dùng nỏ thần chống trả',outcome:'Đúng rồi! Nhưng nếu lẫy nỏ bị đánh cắp thì sao? Hùng Vương cần nghĩ đến kế sách dài hạn hơn.'},
      {text:'🤝 Cầu hòa và nhường đất',outcome:'Sai lầm! Nhường đất không bao giờ là giải pháp bền vững. Văn Lang cần bảo vệ lãnh thổ đến cùng.'},
      {text:'🏔️ Chuyển kinh đô lên núi cao',outcome:'Khôn ngoan! Địa hình núi rừng là lợi thế của người Việt trong chiến tranh du kích.'},
    ],xp:30,explain:'Nhà nước Văn Lang là nhà nước đầu tiên của người Việt, với nền văn minh lúa nước và trống đồng Đông Sơn nổi tiếng.'
  },
  m_giongphu:{cat:'myth',em:'🐴',title:'Thánh Gióng Phù Đổng',yr:'Thời Hùng Vương VI',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0a30,#0d0118)',
    story:'Cậu bé Gióng 3 tuổi không biết nói, không biết đi. Khi giặc Ân xâm lược, sứ giả vua Hùng đến tuyển quân, Gióng bỗng cất tiếng...',
    scene:'Bạn là Gióng khi sứ giả đến. Bạn sẽ nói gì?',
    choices:[
      {text:'⚔️ "Hãy đúc cho ta một con ngựa sắt, roi sắt, giáp sắt!"',outcome:'Đúng! Gióng ăn vươn người thành khổng lồ, cưỡi ngựa sắt phun lửa đánh tan giặc Ân, rồi bay về trời.'},
      {text:'🏃 "Tôi sẽ đi chiêu mộ nghĩa quân"',outcome:'Chưa đúng! Gióng không chiêu mộ quân — một mình ông đánh bại toàn bộ giặc Ân nhờ phép thần.'},
    ],xp:25,explain:'Thánh Gióng là một trong Tứ Bất Tử, biểu tượng sức mạnh bảo vệ tổ quốc của người Việt.'
  },
  m_cholua:{cat:'myth',em:'🌲',title:'Chú Cuội Cung Trăng',yr:'Huyền Thoại',
    bg:'radial-gradient(ellipse at 50% 30%,#0a1030,#0d0118)',
    story:'Cuội tìm được cây thuốc thần có thể cứu người chết. Vợ Cuội vô tình tưới gốc cây bằng nước bẩn, cây bay lên trời...',
    scene:'Bạn là Cuội đang nắm rễ cây. Cây đang bay lên. Bạn sẽ:',
    choices:[
      {text:'🌙 Giữ chặt rễ cây, bay lên cung trăng',outcome:'Cuội theo cây bay lên cung Trăng, mãi ngồi dưới gốc đa trên cung Trăng đến tận bây giờ. Đó là lý do trẻ em nhìn trăng thấy bóng người!'},
      {text:'🏃 Buông tay nhảy xuống đất',outcome:'Nếu buông tay, cây thuốc bay đi mãi. Cuội mất cây thần, không còn khả năng cứu người...'},
    ],xp:20,explain:'Chú Cuội trên cung Trăng là giải thích dân gian cho hình ảnh bóng đen trên mặt trăng.'
  },
  m_maiden:{cat:'myth',em:'👸',title:'Công Chúa Liễu Hạnh',yr:'Thế Kỷ XVI',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0050,#0d0118)',
    story:'Liễu Hạnh — con gái Ngọc Hoàng — vì lỡ tay làm vỡ chén ngọc mà bị đày xuống trần gian. Nàng sống cuộc đời người thường với nhiều nỗi buồn...',
    scene:'Liễu Hạnh được phép trở về thiên đình. Nàng sẽ:',
    choices:[
      {text:'☁️ Trở về thiên đình theo lệnh Ngọc Hoàng',outcome:'Liễu Hạnh trở về thiên đình, nhưng lòng vẫn nhớ trần gian. Nàng xin xuống trần lần nữa để tiếp tục giúp đỡ dân lành.'},
      {text:'🌸 Ở lại trần gian giúp đỡ dân lành',outcome:'Liễu Hạnh chọn ở lại, trở thành Mẫu Liễu Hạnh — một trong Tứ Bất Tử, được thờ phụng khắp Việt Nam.'},
    ],xp:25,explain:'Mẫu Liễu Hạnh là một trong Tứ Bất Tử, Thánh Mẫu quan trọng nhất trong tín ngưỡng thờ Mẫu của người Việt.'
  },
  m_trungquoc:{cat:'myth',em:'🐉',title:'Rồng Tiên — Nguồn Gốc Dân Tộc',yr:'Huyền Sử',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0020,#0d0118)',
    story:'Người Việt tự nhận là con Rồng cháu Tiên — dòng dõi của Lạc Long Quân (Rồng) và Âu Cơ (Tiên). Điều này tạo nên bản sắc độc đáo...',
    scene:'Bạn được hỏi: "Bạn là con ai?" Bạn sẽ trả lời:',
    choices:[
      {text:'🐉 "Tôi là con Rồng, dòng dõi Lạc Long Quân từ biển cả"',outcome:'Đúng một nửa! Người Việt vừa là con Rồng vừa là cháu Tiên — kết hợp sức mạnh biển và núi, âm và dương.'},
      {text:'🦅 "Tôi là cháu Tiên, dòng dõi Âu Cơ từ núi cao"',outcome:'Đúng một nửa! Cần nhớ cả hai — Con Rồng Cháu Tiên là bản sắc trọn vẹn của người Việt.'},
      {text:'🌊 "Tôi là con Rồng cháu Tiên — kết hợp biển và núi"',outcome:'Hoàn toàn đúng! "Con Rồng cháu Tiên" là tự hào dân tộc ngàn đời của người Việt Nam.'},
    ],xp:20,explain:'Huyền thoại "Con Rồng cháu Tiên" giải thích nguồn gốc và bản sắc dân tộc Việt — kết hợp sức mạnh biển và núi.'
  },
  m_phongtho:{cat:'myth',em:'🏔️',title:'Thần Núi & Thần Biển',yr:'Huyền Thoại',
    bg:'radial-gradient(ellipse at 50% 30%,#0a2030,#0d0118)',
    story:'Trong thần thoại Việt, mỗi ngọn núi, con sông đều có Thần cai quản. Thần Núi và Thần Biển đôi khi xung đột...',
    scene:'Bạn là Thần Núi, Thần Biển đang dâng nước đe dọa làng mạc. Bạn sẽ:',
    choices:[
      {text:'⛰️ Nâng cao núi lên bảo vệ dân làng',outcome:'Xuất sắc! Đây chính là phép thuật của Sơn Tinh — bảo vệ đất đai khỏi lũ lụt. Dân làng an toàn!'},
      {text:'🤝 Đàm phán với Thần Biển',outcome:'Khôn ngoan! Hòa giải tránh chiến tranh. Nhưng Thủy Tinh vốn thù dai, liệu thỏa thuận có bền?'},
    ],xp:20,explain:'Thần Núi (Sơn Tinh) và Thần Nước (Thủy Tinh) tượng trưng cho cuộc đấu tranh muôn đời giữa con người và thiên nhiên.'
  },
  m_coloa:{cat:'myth',em:'🐌',title:'Thành Cổ Loa Hình Ốc',yr:'257 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#1a1000,#0d0118)',
    story:'An Dương Vương xây thành Cổ Loa hình xoáy ốc theo gợi ý của Thần Rùa Kim Quy. Thành gồm 3 vòng xoáy, kiên cố bất khả xâm phạm...',
    scene:'Bạn là kiến trúc sư hoàng gia. Tại sao thành hình ốc lại tốt hơn hình vuông?',
    choices:[
      {text:'🌀 Hình xoáy ốc không có góc yếu, khó tấn công hơn',outcome:'Đúng! Thành tròn xoáy không có góc chết, kẻ tấn công luôn bị bắn từ nhiều phía. Đây là thiên tài quân sự cổ đại.'},
      {text:'🎨 Vì hình ốc đẹp hơn hình vuông',outcome:'Thẩm mỹ có phần đúng, nhưng lý do chính là chiến thuật phòng thủ — hình tròn không có điểm yếu.'},
    ],xp:25,explain:'Thành Cổ Loa (Đông Anh, Hà Nội ngày nay) là thành cổ nổi tiếng nhất Việt Nam, được xây khoảng 257 TCN.'
  },
  m_nothanbao:{cat:'myth',em:'🏹',title:'Nỏ Thần Kim Quy',yr:'257 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#0a1a2a,#0d0118)',
    story:'Thần Rùa Kim Quy tặng An Dương Vương chiếc vuốt thần — lẫy nỏ bắn một phát giết nghìn quân. Đây là vũ khí bí mật giữ nước Âu Lạc...',
    scene:'Triệu Đà cho thám tử vào triều đình. Bạn là quan cận thần, bạn phát hiện ra. Bạn sẽ:',
    choices:[
      {text:'🚨 Báo ngay với vua, tăng cường bảo vệ nỏ thần',outcome:'Đúng! Cảnh giác là yếu tố then chốt. Nếu bảo vệ được nỏ thần, Âu Lạc sẽ không bị mất.'},
      {text:'🕵️ Điều tra thêm trước khi báo',outcome:'Chậm trễ nguy hiểm! Trong khi điều tra, thám tử đã kịp đánh cắp bản vẽ nỏ thần...'},
    ],xp:30,explain:'Nỏ thần là vũ khí huyền thoại, có lẽ tượng trưng cho kỹ thuật quân sự tiên tiến của người Âu Lạc cổ đại.'
  },
  m_mychau:{cat:'myth',em:'🪶',title:'Dấu Lông Ngỗng Của Mị Châu',yr:'179 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#200a30,#0d0118)',
    story:'Khi bỏ chạy trước quân Triệu Đà, Mị Châu rắc lông ngỗng trắng dọc đường để Trọng Thủy tìm theo. Không ngờ điều này dẫn giặc đến...',
    scene:'Bạn là tướng của An Dương Vương. Bạn thấy lông ngỗng rải đường. Bạn hiểu điều gì?',
    choices:[
      {text:'💡 Đây là vết chỉ đường cho quân địch!',outcome:'Sáng suốt! Nhưng đã quá muộn — quân Triệu Đà đã theo dấu lông ngỗng đuổi kịp.'},
      {text:'🤔 Đây chỉ là lông chim bình thường',outcome:'Sai! Đây là bằng chứng Mị Châu vô tình (hay hữu ý?) chỉ đường cho quân địch. Bi kịch lịch sử!'},
    ],xp:25,explain:'Câu chuyện lông ngỗng là bài học về bảo mật quân sự và sự ngây thơ có thể gây mất nước.'
  },
  m_tuongda:{cat:'myth',em:'⚔️',title:'Triệu Đà & Âu Lạc',yr:'207 TCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0010,#0d0118)',
    story:'Triệu Đà — tướng nhà Tần — lập nước Nam Việt, thôn tính Âu Lạc. Dùng kế hôn nhân để đánh cắp nỏ thần...',
    scene:'Bạn là Triệu Đà, đã có nỏ thần. Bước tiếp theo là gì?',
    choices:[
      {text:'⚔️ Tấn công ngay khi An Dương Vương không có vũ khí',outcome:'Triệu Đà tấn công chớp nhoáng. Không có nỏ thần, quân Âu Lạc thất thủ nhanh chóng. Kết thúc một triều đại.'},
      {text:'🤝 Đề nghị thần phục, tránh đổ máu',outcome:'Triệu Đà chọn con đường ngoại giao sau chiến thắng quân sự — khôn ngoan về mặt chính trị.'},
    ],xp:25,explain:'Triệu Đà thôn tính Âu Lạc năm 179 TCN, mở đầu thời kỳ Bắc thuộc kéo dài hơn 1000 năm.'
  },
  m_rua:{cat:'myth',em:'🐢',title:'Huyền Thoại Rùa Vàng',yr:'Nhiều Thời',
    bg:'radial-gradient(ellipse at 50% 30%,#003020,#0d0118)',
    story:'Rùa Vàng (Kim Quy) xuất hiện trong nhiều truyện cổ Việt Nam — giúp An Dương Vương xây thành, giúp Lê Lợi có gươm thần...',
    scene:'Rùa Vàng xuất hiện trước mặt bạn, trao cho bạn một vật quý. Bạn đang:',
    choices:[
      {text:'🏗️ Xây thành để bảo vệ đất nước',outcome:'Rùa trao vuốt thần để làm lẫy nỏ. Đây là cảnh An Dương Vương nhận nỏ thần từ Thần Kim Quy.'},
      {text:'⚔️ Đánh đuổi giặc ngoại xâm',outcome:'Rùa trao gươm thần. Đây là cảnh Lê Lợi nhận gươm từ hồ Lục Thủy — sau này là Hồ Hoàn Kiếm Hà Nội!'},
    ],xp:20,explain:'Rùa là linh vật quan trọng trong văn hóa Việt, biểu tượng của sự trường thọ và trí tuệ.'
  },
  m_than:{cat:'myth',em:'✨',title:'Thần Thánh Trong Dân Gian',yr:'Huyền Thoại',
    bg:'radial-gradient(ellipse at 50% 30%,#101020,#0d0118)',
    story:'Người Việt tin vào nhiều vị thần: Thổ Công (thần đất), Táo Quân (thần bếp), Thần Tài... Mỗi vị thần cai quản một lĩnh vực cuộc sống...',
    scene:'Ngày 23 tháng Chạp, bạn cần làm gì để tiễn Táo Quân về trời?',
    choices:[
      {text:'🐟 Thả cá chép xuống sông',outcome:'Đúng! Táo Quân cưỡi cá chép về thiên đình báo cáo với Ngọc Hoàng. Thả cá chép là tục truyền thống ngày 23 tháng Chạp.'},
      {text:'🕯️ Thắp hương và đốt vàng mã',outcome:'Cũng đúng một phần! Nhưng đặc trưng nhất của ngày 23 tháng Chạp là thả cá chép — phương tiện đi lại của Táo Quân.'},
    ],xp:20,explain:'Tín ngưỡng thờ Táo Quân là nét văn hóa đặc sắc của người Việt, phản ánh quan niệm về thần linh trong đời sống.'
  },
  m_ongdong:{cat:'myth',em:'🥁',title:'Trống Đồng Đông Sơn',yr:'500 TCN – 100 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#1a1000,#0d0118)',
    story:'Trống đồng Đông Sơn là vật thiêng của nền văn minh Đông Sơn. Trên mặt trống có hình người múa, chim, thuyền... kể câu chuyện về cuộc sống cổ đại.',
    scene:'Bạn là thầy mo, dùng trống đồng trong lễ hội. Trống đồng dùng để làm gì?',
    choices:[
      {text:'🎵 Nhạc cụ trong lễ hội và nghi lễ tôn giáo',outcome:'Đúng! Trống đồng vừa là nhạc cụ vừa là vật thiêng trong nghi lễ cúng thần, cầu mưa, mừng chiến thắng.'},
      {text:'⚠️ Tín hiệu báo động khi có giặc',outcome:'Cũng đúng! Trống đồng còn dùng để truyền tin hiệu quân sự — âm thanh vang xa hàng cây số.'},
      {text:'💰 Biểu tượng quyền lực và giàu có',outcome:'Đúng nữa! Trống đồng là báu vật, người có trống đồng lớn chứng tỏ quyền lực và địa vị cao trong xã hội.'},
    ],xp:25,explain:'Trống đồng Đông Sơn là biểu tượng văn hóa của nền văn minh Đông Nam Á cổ đại, với hơn 400 chiếc được tìm thấy.'
  },
  m_bachu:{cat:'myth',em:'🌺',title:'Bà Chúa Xứ Núi Sam',yr:'Thế Kỷ XIX',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0020,#0d0118)',
    story:'Bà Chúa Xứ — nữ thần bảo hộ vùng Châu Đốc, An Giang. Tượng Bà được phát hiện trên núi Sam, không ai di chuyển được cho đến khi Bà "chọn" vị trí...',
    scene:'Người ta không thể di chuyển tượng Bà xuống núi. Bạn nghĩ cách giải quyết:',
    choices:[
      {text:'🙏 Thỉnh ý Bà qua đồng bóng, để Bà chỉ nơi muốn ngự',outcome:'Đúng theo truyền thuyết! Bà Chúa Xứ tự chọn nơi ngự, tượng mới được đưa xuống khi nghe lời Bà.'},
      {text:'💪 Dùng nhiều người khiêng hơn',outcome:'Không được! Dù dùng bao nhiêu người, tượng vẫn không nhúc nhích nếu Bà chưa cho phép.'},
    ],xp:20,explain:'Lễ hội Bà Chúa Xứ núi Sam là một trong những lễ hội lớn nhất Việt Nam, thu hút hàng triệu người hành hương mỗi năm.'
  },
  m_phucuc:{cat:'myth',em:'🌊',title:'Thần Biển Và Ngư Dân',yr:'Dân Gian',
    bg:'radial-gradient(ellipse at 50% 30%,#001a2a,#0d0118)',
    story:'Ngư dân Việt Nam từ xưa thờ Cá Ông (Cá Voi) như thần biển bảo hộ. Khi cá voi mắc cạn hoặc chết, ngư dân cử hành tang lễ long trọng...',
    scene:'Cá Ông mắc cạn trên bãi biển của làng chài bạn. Bạn sẽ:',
    choices:[
      {text:'⛵ Cứu cá Ông đưa ra biển',outcome:'Phúc đức! Ngư dân tin rằng cứu cá Ông sẽ được Ông phù hộ, ra biển luôn bình an, cá tôm đầy thuyền.'},
      {text:'🏮 Tổ chức tang lễ trọng thể nếu cá đã chết',outcome:'Đúng phong tục! Ngư dân Việt coi cá voi mắc cạn là điềm Ông về, tổ chức lễ táng trang nghiêm như người thân.'},
    ],xp:20,explain:'Tín ngưỡng thờ Cá Ông phổ biến ở vùng duyên hải miền Trung và Nam Việt Nam, thể hiện mối quan hệ gắn bó giữa ngư dân và biển cả.'
  },
  m_tiensau:{cat:'myth',em:'🦋',title:'Nàng Tiên & Chàng Tiều Phu',yr:'Cổ Tích',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0a30,#0d0118)',
    story:'Một chàng tiều phu nghèo tốt bụng gặp nàng tiên giảng trên rừng. Được tặng ba điều ước...',
    scene:'Bạn là chàng tiều phu được tặng 3 điều ước. Bạn sẽ ước gì đầu tiên?',
    choices:[
      {text:'💰 Của cải vô tận',outcome:'Điều ước hấp dẫn! Nhưng của cải mà không có trí tuệ, sức khỏe và hạnh phúc thì vô nghĩa.'},
      {text:'❤️ Gia đình khỏe mạnh hạnh phúc',outcome:'Khôn ngoan và nhân hậu! Đây là điều ước của người có tâm hồn đẹp — sức khỏe và hạnh phúc quý hơn vàng bạc.'},
      {text:'🏥 Chữa khỏi mọi bệnh tật cho dân làng',outcome:'Vị tha cao cả! Ước cho người khác trước bản thân — đây là phẩm chất được thần tiên và dân làng trân trọng nhất.'},
    ],xp:20,explain:'Truyện cổ tích về điều ước thường chứa bài học đạo đức: lòng nhân hậu và sự vị tha được thưởng hơn lòng tham.'
  },
  m_dragonking:{cat:'myth',em:'🌊',title:'Long Vương Và Biển Đông',yr:'Huyền Thoại',
    bg:'radial-gradient(ellipse at 50% 30%,#001530,#0d0118)',
    story:'Long Vương cai quản Biển Đông từ cung điện ngọc trai dưới đáy biển. Người Việt tin biển cả là lãnh địa của Rồng...',
    scene:'Bạn là ngư dân sắp ra khơi. Để được Long Vương phù hộ, bạn sẽ:',
    choices:[
      {text:'🙏 Cúng lễ và xin phép Long Vương trước khi ra biển',outcome:'Đúng tục lệ! Ngư dân Việt luôn cúng thần biển trước khi ra khơi để được bình an và cá tôm đầy thuyền.'},
      {text:'⚓ Cứ ra khơi, không cần làm lễ',outcome:'Thiếu tôn trọng! Theo tín ngưỡng dân gian, không xin phép thần biển có thể gặp sóng to gió lớn và không bắt được cá.'},
    ],xp:20,explain:'Tín ngưỡng thờ Long Vương và thần biển là nét văn hóa đặc sắc của cộng đồng ngư dân Việt Nam.'
  },
  m_jade:{cat:'myth',em:'☁️',title:'Ngọc Hoàng Thượng Đế',yr:'Tín Ngưỡng Dân Gian',
    bg:'radial-gradient(ellipse at 50% 30%,#101030,#0d0118)',
    story:'Ngọc Hoàng cai quản thiên đình với hàng trăm vị thần. Người Việt tin mọi việc trên trần gian đều phải báo cáo lên Ngọc Hoàng...',
    scene:'Táo Quân báo cáo việc gia đình bạn lên Ngọc Hoàng. Điều gì quan trọng nhất Táo Quân nên báo?',
    choices:[
      {text:'💰 Báo tài sản và của cải gia đình',outcome:'Không phải điều quan trọng nhất! Ngọc Hoàng quan tâm đến đức hạnh, không phải của cải.'},
      {text:'❤️ Báo về lòng tốt và việc thiện đã làm',outcome:'Đúng! Táo Quân báo cáo việc thiện ác của gia đình. Làm việc tốt sẽ được Ngọc Hoàng ban phúc đầu năm mới.'},
    ],xp:20,explain:'Tín ngưỡng Táo Quân kết hợp Đạo giáo Trung Hoa với tín ngưỡng dân gian Việt, tạo nên nét văn hóa độc đáo ngày 23 tháng Chạp.'
  },
  m_tamcam:{cat:'myth',em:'👘',title:'Tấm Cám',yr:'Cổ Tích',
    bg:'radial-gradient(ellipse at 50% 30%,#200a20,#0d0118)',
    story:'Tấm hiền lành bị mẹ kế và Cám đối xử tàn nhẫn. Nhờ sự giúp đỡ của Bụt, Tấm được gặp vua...',
    scene:'Bạn là Tấm, bị mẹ kế giết lần thứ ba. Bạn hóa thân thành:',
    choices:[
      {text:'🐦 Chim Vàng Anh hót bên cạnh vua',outcome:'Đúng theo cổ tích! Tấm hóa thân nhiều lần: chim, cây xoan, khung cửi, quả thị. Cuối cùng trở về làm người và sống hạnh phúc.'},
      {text:'🌸 Hoa sen nở trong hồ hoàng cung',outcome:'Không đúng! Tấm không hóa hoa sen. Các lần hóa thân: chim Vàng Anh → cây xoan đào → khung cửi → quả thị.'},
    ],xp:25,explain:'Truyện Tấm Cám là câu chuyện cổ tích nổi tiếng nhất Việt Nam, mang thông điệp về lòng kiên nhẫn và phần thưởng cho người hiền lành.'
  },
  m_thachsamh:{cat:'myth',em:'🏹',title:'Thạch Sanh Chém Xà Tinh',yr:'Cổ Tích',
    bg:'radial-gradient(ellipse at 50% 30%,#0a2010,#0d0118)',
    story:'Thạch Sanh — con trai Ngọc Hoàng đầu thai — bị Lý Thông lừa đến hang xà tinh. Bằng sức mạnh và dũng cảm, chàng chém chết con trăn khổng lồ...',
    scene:'Thạch Sanh trong hang tối, đối mặt xà tinh khổng lồ. Chàng sẽ:',
    choices:[
      {text:'🏹 Dùng cung thần bắn vào mắt xà tinh',outcome:'Xuất sắc! Thạch Sanh dùng đàn thần và vũ khí được Ngọc Hoàng ban để chiến thắng. Sau đó còn cứu công chúa và đánh bại 18 nước chư hầu bằng tiếng đàn!'},
      {text:'🏃 Chạy trốn và tìm cách khác',outcome:'Thạch Sanh không trốn chạy! Lòng dũng cảm và sức mạnh thần là vũ khí của chàng. Đối mặt và chiến đấu!'},
    ],xp:25,explain:'Thạch Sanh là nhân vật anh hùng dũng cảm, nhân hậu trong cổ tích Việt — đại diện cho lý tưởng về người anh hùng lý tưởng.'
  },
  m_camrong:{cat:'myth',em:'🐉',title:'Cậu Bé Rồng',yr:'Truyền Thuyết',
    bg:'radial-gradient(ellipse at 50% 30%,#001a20,#0d0118)',
    story:'Có chuyện kể về những đứa trẻ sinh ra với dấu hiệu rồng — sau này trở thành những vị tướng kiệt xuất hoặc vua anh minh...',
    scene:'Bạn sinh ra với vệt đỏ hình rồng trên lưng. Người đời nói bạn là:',
    choices:[
      {text:'👑 Con trời, sẽ trở thành vua',outcome:'Theo tín ngưỡng dân gian, dấu rồng là điềm lành, báo hiệu người đó có số phận phi thường, có thể trở thành vua hay tướng.'},
      {text:'⚔️ Chiến tướng bất khả chiến bại',outcome:'Cũng có thể! Nhiều truyền thuyết kể về các danh tướng sinh ra với dấu hiệu đặc biệt, được thần linh ban sức mạnh.'},
    ],xp:20,explain:'Tín ngưỡng về dấu hiệu số phận là nét văn hóa phổ biến, phản ánh niềm tin vào sự sắp xếp của trời đất.'
  },
  m_trongsong:{cat:'myth',em:'🥁',title:'Truyền Thuyết Trống Sấm',yr:'Huyền Thoại',
    bg:'radial-gradient(ellipse at 50% 30%,#101020,#0d0118)',
    story:'Theo truyền thuyết, tiếng sấm là tiếng trống của thần Sấm trên trời. Khi sấm vang, người Việt cổ hiểu đây là thần linh đang truyền thông điệp...',
    scene:'Sấm vang lớn bất thường. Người xưa cho rằng:',
    choices:[
      {text:'⛈️ Thần Sấm đang tức giận, cần làm lễ cúng',outcome:'Theo tín ngưỡng cổ đại! Sấm lớn là dấu hiệu thiên nhiên cần được xoa dịu qua nghi lễ.'},
      {text:'🌧️ Sắp có mưa lớn, cần chuẩn bị cho đồng ruộng',outcome:'Thực tế hơn! Người Việt nông nghiệp học cách đọc tự nhiên — sấm báo mưa, mưa tốt cho lúa.'},
    ],xp:15,explain:'Thần thoại giải thích hiện tượng tự nhiên là đặc trưng của văn hóa nông nghiệp. Người Việt cổ quan sát tự nhiên rất tinh tế.'
  },
  m_honvong:{cat:'myth',em:'🌅',title:'Hòn Vọng Phu',yr:'Truyền Thuyết',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1000,#0d0118)',
    story:'Người vợ đứng trên núi chờ chồng đi lính không về, hóa đá. Câu chuyện này có ở nhiều nơi: Lạng Sơn, Bình Định, Khánh Hòa...',
    scene:'Bạn là người vợ đợi chồng 20 năm. Bạn sẽ:',
    choices:[
      {text:'⛰️ Tiếp tục đứng chờ, tin chồng sẽ về',outcome:'Bi kịch! Lòng chung thủy vô hạn khiến nàng đứng mãi cho đến khi hóa thành đá. Hòn Vọng Phu là biểu tượng tình yêu trung thủy.'},
      {text:'🏡 Trở về chăm sóc con cái và tiếp tục cuộc sống',outcome:'Thực tế và nhân hậu! Nhưng truyền thuyết chọn bi kịch để tôn vinh lòng chung thủy tuyệt đối.'},
    ],xp:20,explain:'Hòn Vọng Phu là biểu tượng văn hóa về lòng chung thủy, có nhiều phiên bản ở khắp Việt Nam.'
  },
  m_cheoleo:{cat:'myth',em:'🎭',title:'Nghệ Thuật Chèo Cổ',yr:'Thế Kỷ X',
    bg:'radial-gradient(ellipse at 50% 30%,#1a1000,#0d0118)',
    story:'Chèo là loại hình nghệ thuật dân gian cổ nhất Việt Nam, kết hợp ca, múa, nhạc và kịch. Thường kể chuyện về đạo đức, nhân nghĩa...',
    scene:'Buổi biểu diễn chèo bắt đầu. Nhân vật phản diện Thị Mầu xuất hiện. Khán giả phản ứng:',
    choices:[
      {text:'😂 Cười và la ó vui vẻ — Thị Mầu rất hài hước',outcome:'Đúng! Nghệ thuật chèo cho phép khán giả tương tác, la ó, cười đùa với nhân vật. Đây là điểm đặc sắc của chèo dân gian.'},
      {text:'😠 Im lặng nghiêm túc xem diễn',outcome:'Không đúng với tinh thần chèo! Chèo là nghệ thuật dân gian vui vẻ, khán giả được phép và được khuyến khích phản ứng.'},
    ],xp:20,explain:'Chèo là di sản văn hóa phi vật thể, có từ thời Đinh (thế kỷ X). Nhân vật Thị Mầu nổi tiếng nhất trong chèo truyền thống Việt Nam.'
  },
  mythlock1:{cat:'myth',em:'🔒',title:'Phong Thần Diễn Nghĩa VN',yr:'???',locked:true},
  mythlock2:{cat:'myth',em:'🔒',title:'Bí Ẩn Tháp Chăm',yr:'???',locked:true},
  mythlock3:{cat:'myth',em:'🔒',title:'Huyền Thoại Núi Tản Viên',yr:'???',locked:true},

  /* ═══ BATTLE EXTRA EVENTS ═══ */
  b_trungvu:{cat:'battle',em:'⚔️',title:'Cuộc Khởi Nghĩa Trưng Vương',yr:'40–43 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#3a0808,#0d0102)',
    story:'Sau khi chồng là Thi Sách bị giết, Trưng Trắc cùng em gái Trưng Nhị nổi dậy, thu hút hàng nghìn nghĩa sĩ...',
    qs:[
      {q:'Thi Sách là chồng của ai?',opts:['Trưng Nhị','Trưng Trắc','Bà Triệu','Nữ tướng khác'],ans:1,time:12},
      {q:'Khởi nghĩa Hai Bà Trưng bùng phát ở đâu?',opts:['Hoa Lư','Mê Linh','Cổ Loa','Thăng Long'],ans:1,time:12},
      {q:'Hai Bà Trưng cầm quyền được bao nhiêu năm?',opts:['1 năm','3 năm','5 năm','10 năm'],ans:1,time:10},
    ],xp:40,explain:'Khởi nghĩa Hai Bà Trưng (40–43 SCN) là cuộc khởi nghĩa vĩ đại đầu tiên, với hàng nghìn nữ tướng tham gia.'
  },
  b_trieuhoa:{cat:'battle',em:'👸',title:'Bà Triệu Khởi Nghĩa',yr:'248 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0820,#0d0102)',
    story:'Triệu Thị Trinh (Bà Triệu) 19 tuổi nói câu nổi tiếng: "Tôi muốn cưỡi cơn gió mạnh, đạp làn sóng dữ, chém cá kình ở biển Đông..."',
    qs:[
      {q:'Bà Triệu nổi dậy vào năm nào?',opts:['40 SCN','111 SCN','248 SCN','544 SCN'],ans:2,time:12},
      {q:'Bà Triệu bao nhiêu tuổi khi khởi nghĩa?',opts:['15','19','25','30'],ans:1,time:10},
      {q:'Bà Triệu khởi nghĩa chống lại ai?',opts:['Nam Hán','Đông Hán','Nhà Ngô (Tào Ngụy)','Nhà Tấn'],ans:2,time:10},
    ],xp:40,explain:'Bà Triệu (225–248) là nữ anh hùng trẻ nhất lịch sử Việt, khởi nghĩa khi 19 tuổi chống nhà Ngô.'
  },
  b_lynam:{cat:'battle',em:'🏴',title:'Lý Bí Lập Nước Vạn Xuân',yr:'544 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0830,#0d0102)',
    story:'Lý Bí khởi nghĩa năm 542, đánh đuổi quân Lương, lập nước Vạn Xuân — nhà nước độc lập ngắn ngủi nhưng quan trọng.',
    qs:[
      {q:'Lý Bí lập nước nào?',opts:['Đại Cồ Việt','Vạn Xuân','Đại Việt','Âu Lạc'],ans:1,time:12},
      {q:'Lý Bí lên ngôi năm nào?',opts:['542','544','550','563'],ans:1,time:10},
      {q:'Nước Vạn Xuân đóng đô ở đâu?',opts:['Hoa Lư','Cổ Loa','Long Biên','Thăng Long'],ans:2,time:10},
    ],xp:35,explain:'Lý Bí lập nước Vạn Xuân năm 544, đánh dấu ý chí độc lập mạnh mẽ dù thời gian tồn tại ngắn.'
  },
  b_khuchua:{cat:'battle',em:'🏛️',title:'Khúc Thừa Dụ Tự Lập',yr:'905 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1000,#0d0102)',
    story:'Năm 905, Khúc Thừa Dụ nhân loạn nhà Đường, tự lập làm Tiết độ sứ, mở đầu thời kỳ tự chủ trước khi Ngô Quyền giành độc lập hoàn toàn.',
    qs:[
      {q:'Khúc Thừa Dụ tự lập năm nào?',opts:['879','905','938','968'],ans:1,time:12},
      {q:'Họ Khúc tự lập nhờ điều kiện gì?',opts:['Đánh bại quân Đường','Nhân loạn nhà Đường','Được nhà Đường trao quyền','Liên minh với Nam Chiếu'],ans:1,time:12},
      {q:'Sau Khúc Thừa Dụ, ai kế tiếp?',opts:['Khúc Hạo','Dương Đình Nghệ','Ngô Quyền','Đinh Bộ Lĩnh'],ans:0,time:10},
    ],xp:35,explain:'Họ Khúc (905–930) mở đầu thời kỳ tự chủ, đặt nền tảng cho Ngô Quyền giành độc lập hoàn toàn.'
  },
  b_ledai:{cat:'battle',em:'🦁',title:'Lê Đại Hành Chống Tống',yr:'981 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#3a0808,#0d0102)',
    story:'Năm 981, nhà Tống xâm lược. Lê Đại Hành (Lê Hoàn) chỉ huy trận Chi Lăng – Bạch Đằng, đánh bại hoàn toàn quân Tống.',
    qs:[
      {q:'Lê Đại Hành đánh bại quân nào năm 981?',opts:['Nam Hán','Nhà Tống','Nhà Minh','Nhà Nguyên'],ans:1,time:12},
      {q:'Trận đánh nào quyết định chiến thắng 981?',opts:['Trận Điện Biên','Bạch Đằng lần 2','Trận Chi Lăng','Trận Đông Bộ Đầu'],ans:1,time:12},
      {q:'Lê Đại Hành lập triều đại nào?',opts:['Nhà Đinh','Nhà Tiền Lê','Nhà Lý','Nhà Trần'],ans:1,time:10},
    ],xp:40,explain:'Lê Đại Hành (Lê Hoàn) là vị vua dũng cảm, không những đánh thắng Tống mà còn chinh phạt Chiêm Thành.'
  },
  b_ngoquyen2:{cat:'battle',em:'⚓',title:'Ngô Quyền & Chiến Lược Thủy Chiến',yr:'938 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0808,#0d0102)',
    story:'Trận Bạch Đằng 938 là một trong những chiến thuật quân sự xuất sắc nhất lịch sử châu Á. Ngô Quyền đã lên kế hoạch chi tiết...',
    qs:[
      {q:'Cọc Bạch Đằng được làm từ vật liệu gì?',opts:['Cọc tre','Cọc sắt','Cọc gỗ bọc sắt','Cọc đá'],ans:2,time:12},
      {q:'Chiến thuật lợi dụng điều kiện tự nhiên nào?',opts:['Gió mùa','Thủy triều xuống','Sương mù','Mưa lớn'],ans:1,time:12},
      {q:'Đội thuyền nhẹ của Ngô Quyền dùng để làm gì?',opts:['Tấn công thẳng','Dụ địch vào bãi cọc','Bảo vệ bờ biển','Vận chuyển lương thực'],ans:1,time:10},
    ],xp:45,explain:'Chiến thuật của Ngô Quyền kết hợp địa hình, thủy triều và bẫy cọc — thiên tài quân sự vẫn được học tập đến ngày nay.'
  },
  b_lythuong:{cat:'battle',em:'🏰',title:'Lý Thường Kiệt & Phòng Tuyến Sông Như Nguyệt',yr:'1077 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#3a1000,#0d0102)',
    story:'Lý Thường Kiệt xây phòng tuyến dọc sông Như Nguyệt (Cầu), chặn đứng 30 vạn quân Tống. Bài thơ "Nam quốc sơn hà" vang lên từ đây...',
    qs:[
      {q:'Lý Thường Kiệt đọc "Nam quốc sơn hà" ở đâu?',opts:['Thành Thăng Long','Sông Bạch Đằng','Phòng tuyến sông Như Nguyệt','Ải Chi Lăng'],ans:2,time:12},
      {q:'Quân Tống xâm lược năm nào?',opts:['1057','1067','1076','1077'],ans:2,time:10},
      {q:'"Nam quốc sơn hà" được coi là gì?',opts:['Chiếu cầu hiền','Bản tuyên ngôn độc lập đầu tiên','Hịch tướng sĩ','Thư gửi quân thù'],ans:1,time:10},
    ],xp:45,explain:'Lý Thường Kiệt (1019–1105) là danh tướng kiệt xuất, tác giả của "Nam quốc sơn hà" — tuyên ngôn độc lập đầu tiên.'
  },
  b_trandao:{cat:'battle',em:'🐘',title:'Trận Đông Bộ Đầu 1258',yr:'1258 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0a00,#0d0102)',
    story:'Lần đầu quân Mông Cổ tấn công Đại Việt. Vua Trần Thái Tông chỉ huy phản công tại Đông Bộ Đầu (Hà Nội), đánh bại đội quân mạnh nhất thế giới...',
    qs:[
      {q:'Đây là lần thứ mấy quân Mông Cổ xâm lược Đại Việt?',opts:['Lần 1','Lần 2','Lần 3','Lần 4'],ans:0,time:10},
      {q:'Chiến thuật "vườn không nhà trống" có nghĩa là gì?',opts:['Trốn vào rừng núi','Sơ tán dân, không để địch lấy lương thực','Xây thành trống không','Đốt nhà trước khi tháo lui'],ans:1,time:12},
      {q:'Vua nào chỉ huy trong lần kháng chiến đầu tiên?',opts:['Trần Hưng Đạo','Trần Nhân Tông','Trần Thái Tông','Trần Anh Tông'],ans:2,time:10},
    ],xp:40,explain:'3 lần kháng chiến chống Mông-Nguyên là kỳ tích lịch sử thế giới — đế quốc Mông Cổ lớn nhất mọi thời đại nhưng thất bại 3 lần liên tiếp.'
  },
  b_hatitran:{cat:'battle',em:'⚔️',title:'Hội Nghị Diên Hồng 1284',yr:'1284 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#2a0800,#0d0102)',
    story:'Trước cuộc xâm lược lần 2 của quân Nguyên, vua Trần triệu tập các bô lão hỏi: "Nên hòa hay nên chiến?" Cả hội trường đồng thanh...',
    qs:[
      {q:'Hội nghị Diên Hồng hỏi các bô lão điều gì?',opts:['Chọn tướng soái','Hòa hay chiến với quân Nguyên','Bầu vua mới','Lên kế hoạch thuế má'],ans:1,time:12},
      {q:'Câu trả lời đồng thanh của hội nghị là gì?',opts:['"Hòa!"','"Chiến!"','"Xin vua quyết!"','"Cần nghĩ thêm"'],ans:1,time:10},
      {q:'Hội nghị Diên Hồng tổ chức năm nào?',opts:['1258','1275','1284','1288'],ans:2,time:10},
    ],xp:40,explain:'Hội nghị Diên Hồng là hình thức dân chủ sơ khai độc đáo, thể hiện sức mạnh đoàn kết toàn dân của nhà Trần.'
  },
  b_chilang:{cat:'battle',em:'🏔️',title:'Trận Chi Lăng – Xương Giang',yr:'1427 SCN',
    bg:'radial-gradient(ellipse at 50% 30%,#1a1000,#0d0102)',
    story:'Lê Lợi dùng địa hình ải Chi Lăng hiểm trở tiêu diệt 10 vạn viện binh nhà Minh. Liễu Thăng tử trận, quân Minh tháo chạy...',
    qs:[
      {q:'Liễu Thăng là ai?',opts:['Vua nhà Minh','Tướng chỉ huy viện binh Minh','Tướng của Lê Lợi','Quan lại nhà Trần'],ans:1,time:12},
      {q:'Ải Chi Lăng ở tỉnh nào ngày nay?',opts:['Cao Bằng','Lạng Sơn','Quảng Ninh','Hà Giang'],ans:1,time:10},
      {q:'Chiến thắng Chi Lăng dẫn đến kết quả gì?',opts:['Giành lại Thăng Long','Quân Minh toàn rút về nước','Lê Lợi lên ngôi vua','Tất cả các đáp án trên'],ans:3,time:12},
    ],xp:45,explain:'Chi Lăng – Xương Giang là chiến thắng quyết định chấm dứt 20 năm đô hộ của nhà Minh (1407–1427).'
  },
  b_lamson:{cat:'battle',em:'🌿',title:'Khởi Nghĩa Lam Sơn',yr:'1418–1427',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0800,#0d0102)',
    story:'Lê Lợi phát động khởi nghĩa từ rừng núi Lam Sơn (Thanh Hóa) với lực lượng ban đầu chỉ vài trăm người...',
    qs:[
      {q:'Khởi nghĩa Lam Sơn bắt đầu ở đâu?',opts:['Hoa Lư','Lam Sơn - Thanh Hóa','Thăng Long','Hội An'],ans:1,time:12},
      {q:'Lê Lợi khởi nghĩa năm nào?',opts:['1407','1418','1424','1427'],ans:1,time:10},
      {q:'Ai soạn "Bình Ngô Đại Cáo" sau thắng lợi?',opts:['Lê Lợi','Lê Lai','Nguyễn Trãi','Lê Thánh Tông'],ans:2,time:10},
    ],xp:45,explain:'Khởi nghĩa Lam Sơn 10 năm gian khổ (1418–1428) kết thúc thắng lợi với Bình Ngô Đại Cáo — áng hùng văn bất hủ.'
  },
  battlock1:{cat:'battle',em:'🔒',title:'Nguyễn Huệ Đại Phá Quân Thanh',yr:'1789',locked:true},

  /* ═══ DYNASTY EXTRA EVENTS ═══ */
  d_tienle:{cat:'dynasty',em:'⚔️',title:'Nhà Tiền Lê — Lê Hoàn',yr:'980–1009',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0808,#0d0a01)',
    story:'Nhà Tiền Lê do Lê Hoàn sáng lập sau khi phế truất vua Đinh còn nhỏ tuổi. Ông đánh bại quân Tống năm 981.',
    tlTask:'Sắp xếp các triều đại theo đúng thứ tự từ cũ đến mới:',
    tlItems:[
      {id:'vl',text:'Văn Lang · Hùng Vương',yr:'2879 TCN',order:0},
      {id:'alak',text:'Âu Lạc · An Dương Vương',yr:'257 TCN',order:1},
      {id:'nviet',text:'Nam Việt · Triệu Đà',yr:'207 TCN',order:2},
      {id:'bacthuoc',text:'Bắc Thuộc lần 1',yr:'111 TCN',order:3},
    ],xp:55,explain:'Thứ tự: Văn Lang → Âu Lạc → Nam Việt → Bắc Thuộc — hành trình từ nhà nước đầu tiên đến mất nước.'
  },
  d_macmac:{cat:'dynasty',em:'🏯',title:'Nhà Mạc & Nam Bắc Triều',yr:'1527–1592',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1800,#0d0a01)',
    story:'Mạc Đăng Dung cướp ngôi nhà Lê năm 1527. Nhà Lê phục hồi ở phía Nam, dẫn đến thời kỳ Nam Bắc Triều phân tranh.',
    tlTask:'Sắp xếp các sự kiện trong thời Nam Bắc Triều theo thứ tự:',
    tlItems:[
      {id:'mac1',text:'Mạc Đăng Dung cướp ngôi nhà Lê',yr:'1527',order:0},
      {id:'lph',text:'Lê Trung Hưng — nhà Lê phục hồi ở Thanh Hóa',yr:'1533',order:1},
      {id:'nb',text:'Thời kỳ Nam Bắc Triều phân tranh',yr:'1545',order:2},
      {id:'mac2',text:'Nhà Lê diệt nhà Mạc, thống nhất phương Bắc',yr:'1592',order:3},
    ],xp:55,explain:'Nam Bắc Triều (1527–1592) là thời kỳ đất nước bị chia cắt giữa nhà Mạc ở phía Bắc và nhà Lê ở phía Nam.'
  },
  d_tayon:{cat:'dynasty',em:'🌟',title:'Tây Sơn & Nguyễn Huệ',yr:'1771–1802',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0a00,#0d0a01)',
    story:'Phong trào Tây Sơn do 3 anh em nhà Nguyễn lãnh đạo, đánh đổ chúa Nguyễn và chúa Trịnh, thống nhất đất nước, sau đó đại phá quân Thanh.',
    tlTask:'Sắp xếp các sự kiện của phong trào Tây Sơn:',
    tlItems:[
      {id:'ts1',text:'Khởi nghĩa Tây Sơn nổ ra',yr:'1771',order:0},
      {id:'ts2',text:'Nguyễn Huệ lên ngôi Quang Trung',yr:'1788',order:1},
      {id:'ts3',text:'Đại phá quân Thanh trong 5 ngày',yr:'1789',order:2},
      {id:'ts4',text:'Quang Trung mất đột ngột',yr:'1792',order:3},
    ],xp:60,explain:'Quang Trung Nguyễn Huệ (1753–1792) là thiên tài quân sự và chính trị, đại phá 29 vạn quân Thanh chỉ trong 5 ngày Tết Kỷ Dậu.'
  },
  d_nguyen:{cat:'dynasty',em:'👑',title:'Nhà Nguyễn Triều Đại Cuối',yr:'1802–1945',
    bg:'radial-gradient(ellipse at 50% 30%,#2a1800,#0d0a01)',
    story:'Nguyễn Ánh (Gia Long) thống nhất đất nước năm 1802 sau khi đánh bại Tây Sơn. Triều Nguyễn là triều đại cuối cùng với 13 đời vua.',
    tlTask:'Sắp xếp các sự kiện của triều Nguyễn từ cũ đến mới:',
    tlItems:[
      {id:'ng1',text:'Gia Long thống nhất đất nước',yr:'1802',order:0},
      {id:'ng2',text:'Pháp xâm lược Nam Kỳ',yr:'1858',order:1},
      {id:'ng3',text:'Hiệp ước Patenôtre — Việt Nam thành thuộc địa',yr:'1884',order:2},
      {id:'ng4',text:'Vua Bảo Đại thoái vị — kết thúc chế độ quân chủ',yr:'1945',order:3},
    ],xp:60,explain:'Triều Nguyễn vừa có công thống nhất đất nước vừa có tội để mất nước vào tay Pháp.'
  },
  d_phapthuan:{cat:'dynasty',em:'🇫🇷',title:'Pháp Thuộc & Phong Trào Yêu Nước',yr:'1858–1945',
    bg:'radial-gradient(ellipse at 50% 30%,#1a0818,#0d0a01)',
    story:'Từ 1858, Pháp từng bước xâm chiếm Việt Nam. Nhiều phong trào kháng chiến nổ ra: Cần Vương, Đông Du, Đông Kinh nghĩa thục...',
    tlTask:'Sắp xếp các phong trào chống Pháp theo thứ tự thời gian:',
    tlItems:[
      {id:'pf1',text:'Phong trào Cần Vương — vua Hàm Nghi',yr:'1885',order:0},
      {id:'pf2',text:'Phong trào Đông Du — Phan Bội Châu',yr:'1905',order:1},
      {id:'pf3',text:'Đảng Cộng sản Đông Dương thành lập',yr:'1930',order:2},
      {id:'pf4',text:'Cách mạng Tháng Tám thành công',yr:'1945',order:3},
    ],xp:60,explain:'Hơn 80 năm chống Pháp với nhiều thế hệ anh hùng, từ vũ trang đến chính trị, kết thúc bằng thắng lợi Cách mạng Tháng Tám 1945.'
  },
  d_cachtang:{cat:'dynasty',em:'⭐',title:'Độc Lập 1945 & Chiến Tranh',yr:'1945–1975',
    bg:'radial-gradient(ellipse at 50% 30%,#0a1000,#0d0a01)',
    story:'2/9/1945 Hồ Chí Minh đọc Tuyên ngôn Độc lập. Nhưng ngay sau đó là kháng chiến chống Pháp rồi chống Mỹ...',
    tlTask:'Sắp xếp các sự kiện lịch sử hiện đại theo thứ tự:',
    tlItems:[
      {id:'hd1',text:'Tuyên ngôn Độc lập 2/9/1945',yr:'1945',order:0},
      {id:'hd2',text:'Chiến thắng Điện Biên Phủ',yr:'1954',order:1},
      {id:'hd3',text:'Mỹ rút quân — Hiệp định Paris',yr:'1973',order:2},
      {id:'hd4',text:'Thống nhất đất nước 30/4/1975',yr:'1975',order:3},
    ],xp:60,explain:'30 năm chiến tranh (1945–1975) kết thúc bằng thắng lợi vĩ đại, thống nhất đất nước sau 21 năm chia cắt.'
  },
  dynlock1:{cat:'dynasty',em:'🔒',title:'Nhà Nguyễn — Triều Đại Cuối Cùng',yr:'1802–1945',locked:true},
};

/* ════════════════════════════════
   STATE & HELPERS
════════════════════════════════ */
var xp=120, freeLeft=3, curCat='battle', curEv=null, vtimer=null;
let timerInterval=null, timeLeft=0;
let tlOrder=[], dragSrc=null;
let storyStep=0;

function go(screen, cat, _opts){
  const el=document.getElementById('s-'+screen);
  document.querySelectorAll('.screen.active').forEach(s=>{
    if(s!==el) s.classList.remove('active');
  });
  el.classList.add('active');
  if(cat) {
    curCat=cat;
    ['s-map','s-event','s-journal'].forEach(id=>{
      const s=document.getElementById(id);
      s.className='screen'+(s.classList.contains('active')?' active':'');
      if(cat) s.classList.add('theme-'+cat);
    });
  }
  if(screen==='map') setTimeout(()=>renderMap(cat||curCat),50);
  if(screen==='journal') renderJournalScreen();
  window.scrollTo(0,0);
  // Push path route unless called from popstate handler
  if(!(_opts && _opts.skipRoute)) _pushRoute(screen, cat);
}

/* ════════════════════════════════
   PATH ROUTING (SPA)
════════════════════════════════ */
var _routeHandling = false; // guard against popstate loops

function _pushRoute(screen, cat) {
  var path;
  if(screen==='landing') path='/landing';
  else if(screen==='catselect') path='/catselect';
  else if(screen==='map') path='/map/'+(cat||curCat||'myth');
  else if(screen==='event') path='/event/'+(curEv||'');
  else if(screen==='journal') path='/journal';
  else if(screen==='pay'||screen==='payment') path='/pay';
  else if(screen==='admin') path='/admin';
  else path='/';
  if(window.location.pathname !== path) {
    history.pushState({screen:screen, cat:cat, ev:curEv}, '', path);
  }
}

function _applyPathRoute(replace) {
  var parts = window.location.pathname.replace(/^\//, '').split('/');
  var seg0 = parts[0] || '';
  var seg1 = parts[1] || '';
  var opts = {skipRoute: true};
  if(seg0 === 'event' && seg1) {
    var eid = seg1;
    if(EVS[eid]) {
      // defer until auth is confirmed
      window._pendingRoute = function(){ openEv(eid, opts); };
    } else {
      window._pendingRoute = function(){ go('landing','',opts); };
    }
  } else if(seg0 === 'map' && seg1) {
    var cat = (['myth','battle','dynasty'].includes(seg1)) ? seg1 : 'myth';
    window._pendingRoute = function(){ go('map', cat, opts); };
  } else if(seg0 === 'catselect') {
    window._pendingRoute = function(){ go('catselect', '', opts); };
  } else if(seg0 === 'journal') {
    window._pendingRoute = function(){ go('journal', '', opts); };
  } else if(seg0 === 'pay') {
    window._pendingRoute = function(){ go('pay', '', opts); };
  } else if(seg0 === 'admin') {
    window._pendingRoute = function(){ go('admin', '', opts); };
  } else if(seg0 === 'landing' || seg0 === '') {
    window._pendingRoute = null; // default: landing shown by checkAuth
  } else {
    window._pendingRoute = null;
  }
}

function _hasRouteAuth() {
  return document.body.classList.contains('logged-in') ||
    Boolean(localStorage.getItem('token')) ||
    Boolean(localStorage.getItem('temporal_currentUser'));
}

function _runPendingRouteIfReady() {
  if (!_hasRouteAuth()) return false;
  if (!window._pendingRoute) _applyPathRoute(false);
  var pending = window._pendingRoute;
  if (typeof pending !== 'function') return false;
  window._pendingRoute = null;
  pending();
  return true;
}

function _checkAuthThenApplyRoute() {
  var authFn = window.checkAuth || checkAuth;
  try {
    var result = authFn && authFn();
    if (result && typeof result.then === 'function') {
      result.then(function(){ setTimeout(_runPendingRouteIfReady, 0); }).catch(function(){});
    } else {
      setTimeout(_runPendingRouteIfReady, 0);
    }
  } catch (error) {
    setTimeout(_runPendingRouteIfReady, 0);
  }
}

function _installRouteAuthHooks() {
  if (window.checkAuth && !window.checkAuth.__routefixLaclong) {
    var originalCheckAuth = window.checkAuth;
    window.checkAuth = function() {
      var result = originalCheckAuth.apply(this, arguments);
      Promise.resolve(result).then(function(){ setTimeout(_runPendingRouteIfReady, 0); }).catch(function(){});
      return result;
    };
    window.checkAuth.__routefixLaclong = true;
  }
  if (window.handleLogin && !window.handleLogin.__routefixLaclong) {
    var originalHandleLogin = window.handleLogin;
    window.handleLogin = function() {
      var result = originalHandleLogin.apply(this, arguments);
      Promise.resolve(result).then(function(){
        setTimeout(_checkAuthThenApplyRoute, 0);
        setTimeout(_runPendingRouteIfReady, 250);
      }).catch(function(){});
      return result;
    };
    window.handleLogin.__routefixLaclong = true;
  }
}

window.addEventListener('popstate', function(e) {
  if(_routeHandling) return;
  _routeHandling = true;
  var st = e.state;
  var opts = {skipRoute: true};
  if(st && st.screen) {
    if(st.screen === 'event' && st.ev && EVS[st.ev]) {
      openEv(st.ev, opts);
    } else {
      go(st.screen, st.cat||'', opts);
    }
  } else {
    _applyPathRoute(false);
    if(window._pendingRoute) { window._pendingRoute(); window._pendingRoute=null; }
  }
  setTimeout(function(){ _routeHandling = false; }, 50);
});

function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('on');
  setTimeout(()=>t.classList.remove('on'),2800);
}

/* ════════════════════════════════
   RENDER MAP
════════════════════════════════ */
/* ════════════════════════════════
   PATH MAP RENDERER
════════════════════════════════ */
let pathPage_cur=0;
const PATH_PAGE_SIZE=4; // events per "page"

function renderMap(cat){
  const C=CATS[cat];
  syncHud();
  document.getElementById('map-title').textContent=C.label;
  document.getElementById('diff-icon').textContent=C.icon;
  document.getElementById('diff-name').textContent=`${C.label.toUpperCase()} · ĐỘ KHÓ: ${C.diff}`;
  document.getElementById('diff-desc').textContent=C.diffDesc;
  document.getElementById('reward-ttl').textContent=`🎗️ HUY HIỆU ${C.label.split(' ').slice(1).join(' ').toUpperCase()}`;
  document.getElementById('badges-row').innerHTML=C.rewards.map(b=>`
    <div class="badge-item${b.locked?' locked-b':''}">
      ${b.em}<div class="badge-lbl">${b.name}</div>
    </div>`).join('');
  pathPage_cur=0;
  renderPathMap(cat);
}

function renderPathMap(cat){
  const C=CATS[cat];
  const allEvents=[];
  C.eras.forEach(era=>{
    era.events.forEach(eid=>{
      allEvents.push({eid,era:era.label,yr:era.yr});
    });
  });

  const total=allEvents.length;
  // Update nav: hide arrows, show total
  document.getElementById('path-prev').style.display='none';
  document.getElementById('path-next').style.display='none';
  document.getElementById('path-counter').textContent=`${total} sự kiện · kéo ngang để xem`;

  const acc={myth:'#9b59b6',battle:'#da251d',dynasty:'#c9a84c'}[cat]||'#c9a84c';
  const bgMap={
    myth:'linear-gradient(135deg,#5a0870,#9b59b6)',
    battle:'linear-gradient(135deg,#6a0808,#da251d)',
    dynasty:'linear-gradient(135deg,#5a3800,#c9a84c)'
  };
  const bg=bgMap[cat];

  // NODE SIZE & SPACING
  const NODE_W=120;
  const H=Math.max(window.innerHeight - 160, 280);
  const canvasW=Math.max(window.innerWidth, total*NODE_W+80);
  const canvas=document.getElementById('path-canvas');
  canvas.style.height=H+'px';
  canvas.style.width=canvasW+'px';

  // Y flowing river path - organic wave, not strict zigzag
  const yCenter=H*0.44;
  const amplitude=H*0.22;
  const positions=allEvents.map((_,i)=>{
    // Use sine wave with varying frequency for organic feel
    const phase = i * 0.85 + Math.sin(i*0.3)*0.4;
    const y = yCenter + Math.sin(phase) * amplitude;
    return {
      x: 40 + i*NODE_W + NODE_W/2 - 10,
      y: Math.max(H*0.12, Math.min(H*0.76, y))
    };
  });

  // SVG connecting path
  let pathD='';
  if(positions.length>1){
    pathD='M'+positions[0].x+','+positions[0].y;
    for(let i=1;i<positions.length;i++){
      const p=positions[i], pp=positions[i-1];
      const cpx=(pp.x+p.x)/2;
      pathD+=` C${cpx},${pp.y} ${cpx},${p.y} ${p.x},${p.y}`;
    }
  }

  const svg=positions.length>1?`
  <svg style="position:absolute;top:0;left:0;width:${canvasW}px;height:100%;pointer-events:none"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="hg2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="hg2grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${acc}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${acc}" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <path d="${pathD}" fill="none" stroke="${acc}" stroke-width="12" opacity="0.1" stroke-linecap="round"/>
    <path d="${pathD}" fill="none" stroke="url(#hg2grad)" stroke-width="5"
      stroke-dasharray="16 8" stroke-linecap="round" filter="url(#hg2)" opacity="0.7"/>
    ${positions.slice(0,-1).map((p,i)=>{
      const nx=positions[i+1]; const mx=(p.x+nx.x)/2; const my=(p.y+nx.y)/2;
      return `<circle cx="${mx}" cy="${my}" r="3.5" fill="${acc}" opacity="0.4"/>
              <circle cx="${mx}" cy="${my}" r="1.5" fill="#fff" opacity="0.6"/>`;
    }).join('')}
  </svg>`:'';

  // ERA dividers: vertical dotted lines when era changes
  let eraDivs='';
  let lastEra='';
  allEvents.forEach((ev,i)=>{
    if(ev.era!==lastEra&&i>0){
      const x=positions[i].x-NODE_W/2;
      eraDivs+=`<div style="position:absolute;left:${x}px;top:8px;bottom:8px;
        width:1px;background:linear-gradient(180deg,transparent,${acc},transparent);opacity:0.25;z-index:1;pointer-events:none"></div>`;
    }
    lastEra=ev.era;
  });

  // ERA labels at top
  let eraLabels='';
  let eraStart={};
  allEvents.forEach((ev,i)=>{
    if(!eraStart[ev.era]) eraStart[ev.era]={start:i,count:0};
    eraStart[ev.era].count++;
  });
  Object.entries(eraStart).forEach(([era,info])=>{
    const cx=positions[info.start].x + (info.count-1)*NODE_W/2;
    eraLabels+=`<div style="position:absolute;top:4px;left:${cx-60}px;width:120px;
      text-align:center;font-size:9px;color:${acc};letter-spacing:1px;opacity:0.8;
      text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
      z-index:3">${era}</div>`;
  });

  // Nodes
  const nodes=allEvents.map((ev,i)=>{
    const e=EVS[ev.eid]; if(!e) return '';
    const p=positions[i];
    const isLocked=!!e.locked;
    const isTop=p.y<H*0.5;
    const click=isLocked?`onclick="needPay()"`:
      (freeLeft<=0&&freeLeft!==99)?`onclick="go('pay','')"`:`onclick="openEv('${ev.eid}')"`;
    return `<div class="path-node${isLocked?' locked':''} ${isTop?'node-top':'node-bot'}"
      style="left:${p.x}px;top:${p.y}px" ${click}>
      <div class="path-node-circle" style="background:${bg};width:64px;height:64px">
        <span style="font-size:22px;line-height:1">${e.em}</span>
        <div class="path-node-num" style="font-size:10px;width:18px;height:18px">${i+1}</div>
        ${isLocked?'<div class="path-lock" style="font-size:16px">🔒</div>':''}
      </div>
      <div class="path-node-label" style="max-width:90px;font-size:11px">${e.title}</div>
      <div class="path-node-yr" style="font-size:10px">${e.yr}</div>
    </div>`;
  }).join('');

  canvas.innerHTML=svg+eraDivs+eraLabels+nodes;
  document.getElementById('path-nav').style.display='flex';
  _resetPathScroll();
}

function pathPage(dir){
  // No-op: pagination removed, all shown on one scrollable canvas
}

function renderEvCard(eid,cat){
  const e=EVS[eid]; if(!e) return '';
  const isLocked=e.locked;
  const isDone=!isLocked&&false; // simplified
  const status=isLocked?`<div class="evc-badge b-lock">KHÓA</div>`:`<div class="evc-badge b-free">FREE</div>`;
  const imgs={myth:'radial-gradient(circle,#3a0860,#0d0118)',battle:'radial-gradient(circle,#4a0808,#0d0102)',dynasty:'radial-gradient(circle,#2a1a00,#0d0a01)'};
  const click=isLocked?`onclick="needPay()"`:`onclick="openEv('${eid}')"`;
  return `<div class="evc${isLocked?' locked':''}" ${click}>
    <div class="evc-img" style="background:${e.bg||imgs[cat]}">
      <div class="evc-em">${e.em}</div>
    </div>
    <div class="evc-info">
      <div class="evc-title">${e.title}</div>
      <div class="evc-yr">${e.yr}</div>
    </div>
    ${status}
  </div>`;
}

/* ════════════════════════════════
   OPEN EVENT
════════════════════════════════ */
function openEv(eid, _opts){
  const e=EVS[eid]; if(!e) return;
  curEv=eid; curCat=e.cat; storyStep=0; quizPassed=false;
  if(!(_opts && _opts.skipRoute)) {
    var path = '/event/'+eid;
    if(window.location.pathname !== path)
      history.pushState({screen:'event', cat:e.cat, ev:eid}, '', path);
  }
  logExperience({ type:'open', title:`Mở sự kiện: ${e.title}`, details:`${getCategoryDisplayName(e.cat)} · ${e.yr}`, eventId:eid, category:e.cat, year:e.yr });
  const cat=e.cat;
  const evEl=document.getElementById('s-event');
  evEl.className='screen theme-'+cat;

  document.getElementById('evhem').textContent=e.em;
  document.getElementById('evhtitle').textContent=e.title;
  document.getElementById('evhyr').textContent=e.yr;
  document.getElementById('evhbg').style.background=e.bg||'#0d0102';
  document.getElementById('ev-bar-title').textContent=e.title;

  const modeLabel={myth:'📿 Kể Chuyện',battle:'⏳ Quiz Tốc Độ',dynasty:'🗓️ Sắp Xếp Timeline'};
  document.getElementById('ev-bar-mode').textContent=modeLabel[cat]||'';
  document.getElementById('ev-nav-back').onclick=()=>go('map',cat);
  document.getElementById('ev-back').onclick=()=>go('map',cat);

  const C=CATS[cat];
  const _evVidUrl=e.vidUrl||null;
  const _evVidFallback=e.vidFallbackUrl||null;
  let html=`<div class="event-left">
    <div class="sec-ttl">📋 Câu Chuyện Lịch Sử</div>
    <p class="story">${e.story}</p>
    <div class="sec-ttl">🎞️ Video AI Tái Hiện</div>
    <div class="vidbox" onclick="${_evVidUrl?`_playEventVid('${_evVidUrl}','${_evVidFallback||''}')`:'playVid()'}">
      <div class="vplaybtn">▶</div>
      <div class="vlbl">${_evVidUrl?'Xem Video Tái Hiện · Temporal Odyssey':'Xem Video Lịch Sử · AI Generated'}</div>
      <div class="vsub">~2 phút · Miễn phí</div>
    </div>
  </div>
  <div class="event-right">`;

  if(cat==='myth') html+=renderStoryMode(e);
  else if(cat==='battle') html+=renderBattleMode(e);
  else if(cat==='dynasty') html+=renderTimelineMode(e);

  html+=`<div class="result-box" id="result-box">
    <div class="res-ttl" id="r-ttl"></div>
    <div class="res-exp" id="r-exp"></div>
    <div class="xp-chip" id="r-xp"></div>
    <br><button class="btn-quiz" onclick="openQuiz('${eid}')">📝 Kiểm Tra Kiến Thức</button>
    <button class="btn-main" style="font-size:11px;padding:11px 24px;margin-top:10px" onclick="nextEv()">Tiếp Theo →</button>
  </div>
  </div>`;

  const evBody=document.getElementById('evbody');
  evBody.innerHTML=html;
  evBody.scrollTop=0;
  evEl.classList.add('active');
  go('event',cat,_opts);
  requestAnimationFrame(()=>{ evBody.scrollTop=0; evEl.scrollTop=0; });

  if(cat==='battle') startTimer(e);
  if(cat==='dynasty') initDrag();
}

/* ────────────────────────────────
   MODE A: STORY (MYTH)
──────────────────────────────── */
function renderStoryMode(e){
  return `
    <div class="sec-ttl">📿 Chọn Nhánh Câu Chuyện</div>
    <div class="story-choice-wrap">
      <div class="story-scene">${e.scene}</div>
      <div class="choices">
        ${e.choices.map((c,i)=>`<button class="choice-btn" onclick="pickChoice(${i})">${c.text}</button>`).join('')}
      </div>
      <div class="story-outcome" id="story-outcome"></div>
    </div>`;
}
function pickChoice(idx){
  const e=EVS[curEv];
  const choice=e.choices[idx];
  // Delegate to myth flow when event has correct/incorrect choices
  if(e.cat==='myth' && typeof choice.correct !== 'undefined'){
    _handleMythChoice(idx,choice,e);
    return;
  }
  // Legacy flow: all choices equal (no correct field)
  document.querySelectorAll('.choice-btn').forEach((b,i)=>{
    b.disabled=true;
    if(i===idx) b.classList.add('chosen');
  });
  const out=document.getElementById('story-outcome');
  out.textContent=choice.outcome;
  out.style.display='block';
  awardXp(e.xp,{ type:'story', title:`Hoàn thành: ${e.title}`, details:e.explain, eventId:curEv, category:e.cat, year:e.yr });
  showResult(true,`✨ Câu chuyện đã được chọn!`,e.explain,`+${e.xp} XP`);
}

/* ────────────────────────────────
   MYTH BRANCH FLOW (correct/wrong)
──────────────────────────────── */
function _handleMythChoice(idx,choice,e){
  const btns=document.querySelectorAll('.choice-btn');
  btns.forEach((b,i)=>{
    b.disabled=true;
    if(i===idx){
      b.classList.add(choice.correct?'choice-correct':'choice-wrong');
      // Add picked badge
      if(!b.querySelector('.choice-picked-badge')){
        const badge=document.createElement('span');
        badge.className='choice-picked-badge';
        badge.textContent=choice.correct?'✓ Đúng':'✕ Chưa đúng';
        b.appendChild(badge);
      }
    }
  });
  const out=document.getElementById('story-outcome');
  if(choice.correct){
    out.className='story-outcome outcome-correct';
    out.innerHTML=`<div class="outcome-badge">✅ Chính xác!</div>`
      +`<p class="outcome-msg">Đây là chi tiết quan trọng trong truyền thuyết Lạc Long Quân &amp; Âu Cơ.</p>`
      +`<p class="outcome-detail">${choice.outcome}</p>`;
    out.style.display='block';
    awardXp(e.xp,{ type:'story', title:`Hoàn thành: ${e.title}`, details:e.explain, eventId:curEv, category:e.cat, year:e.yr });
    showResult(true,`✨ Chính xác!`,e.explain,`+${e.xp} XP`);
    // Ensure quiz button is visible, hide "Tiếp Theo" is already shown on win
    const qBtn=document.querySelector('.btn-quiz');
    if(qBtn) qBtn.style.display='';
    const nextBtn=document.querySelector('#result-box .btn-main');
    if(nextBtn) nextBtn.style.display='';
  } else {
    out.className='story-outcome outcome-wrong';
    out.innerHTML=`<div class="outcome-badge outcome-badge-wrong">❌ Chưa đúng</div>`
      +`<p class="outcome-detail">${choice.outcome}</p>`;
    out.style.display='block';
    // Insert watch-video button as standalone block AFTER outcome box
    let watchWrap=document.getElementById('myth-watch-wrap');
    if(!watchWrap){
      watchWrap=document.createElement('div');
      watchWrap.id='myth-watch-wrap';
      watchWrap.style.cssText='margin-top:12px';
      out.parentNode.insertBefore(watchWrap, out.nextSibling);
    }
    watchWrap.innerHTML=`<button class="btn-watch-vid" onclick="_playMythBranchVid('${choice.videoUrl}','${choice.videoFallbackUrl||''}')">🎬 Xem Video Giải Thích</button>`;
    // Hide quiz button and "Tiếp Theo" — only unlocked after correct choice
    const qBtn=document.querySelector('.btn-quiz');
    if(qBtn) qBtn.style.display='none';
    const nextBtn=document.querySelector('#result-box .btn-main');
    if(nextBtn) nextBtn.style.display='none';
    // Don't show result-box on wrong branch — watchWrap handles everything
    const box=document.getElementById('result-box');
    if(box) box.style.display='none';
  }
}

function _renderMediaInPlayer(player, url, opts){
  opts = opts || {};
  const fallback = opts.errorHtml || '<div class="vsim" style="aspect-ratio:16/9"><div class="vsim-txt">Không tải được video.</div></div>';
  const id=opts.id||'ev-vid';
  const fallbackUrl=opts.fallbackUrl||'';
  player.innerHTML=`<video id="${id}" src="${url}" controls playsinline preload="metadata"
    style="width:100%;height:100%;display:block;background:#000;object-fit:contain;border-radius:8px">
    <p>Trình duyệt không hỗ trợ video. <a href="${url}">Tải xuống</a></p></video>`;
  const vid=document.getElementById(id);
  if(vid){
    if(opts.onEnded) vid.addEventListener('ended',opts.onEnded);
    vid.addEventListener('error',function(){
      if(fallbackUrl && vid.dataset.fallbackTried!=='1'){
        vid.dataset.fallbackTried='1';
        vid.src=fallbackUrl;
        vid.load();
        return;
      }
      player.innerHTML=fallback;
    });
  }
  return 'video';
}

const VIDEO_URL_CACHE = {};
async function _resolveVideoUrl(url, fallbackUrl){
  if(!fallbackUrl) return url;
  const key=url+'|'+fallbackUrl;
  if(VIDEO_URL_CACHE[key]) return VIDEO_URL_CACHE[key];
  try{
    const res=await fetch(url,{method:'HEAD',cache:'no-store'});
    VIDEO_URL_CACHE[key]=res.ok?url:fallbackUrl;
  }catch(e){
    VIDEO_URL_CACHE[key]=fallbackUrl;
  }
  return VIDEO_URL_CACHE[key];
}

async function _playMythBranchVid(videoUrl, fallbackUrl){
  const e=curEv?EVS[curEv]:null;
  document.getElementById('vmod-ttl').textContent=(e?e.title:'Video')+'  —  Video Giải Thích';
  const player=document.getElementById('vmod-player');
  player.innerHTML='<div class="vsim" style="aspect-ratio:16/9"><div class="vsim-txt">Đang chuẩn bị video...</div></div>';
  document.getElementById('vmodal').classList.add('open');
  const resolvedUrl=await _resolveVideoUrl(videoUrl,fallbackUrl);
  _renderMediaInPlayer(player, resolvedUrl, {
    id:'myth-vid',
    title:'Video giải thích',
    fallbackUrl:fallbackUrl && resolvedUrl!==fallbackUrl ? fallbackUrl : '',
    onEnded:function(){ closeVid(); },
    errorHtml:'<div class="vsim" style="aspect-ratio:16/9">'
      +'<div class="vsim-txt" style="font-size:14px;color:#e8a8a8">Không tải được video.<br>'
      +'<button class="btn-retry-myth" style="margin-top:12px" onclick="_retryMythChoice();closeVid()">🔄 Chọn Lại</button>'
      +'</div></div>'
  });
  window._mythBranchActive=true;
}

function _retryMythChoice(){
  const out=document.getElementById('story-outcome');
  if(out){ out.style.display='none'; out.innerHTML=''; out.className='story-outcome'; }
  // Remove standalone watch-video button wrap
  const watchWrap=document.getElementById('myth-watch-wrap');
  if(watchWrap) watchWrap.remove();
  document.querySelectorAll('.choice-btn').forEach(b=>{
    b.disabled=false;
    b.classList.remove('choice-correct','choice-wrong','chosen');
    const badge=b.querySelector('.choice-picked-badge');
    if(badge) badge.remove();
  });
  const box=document.getElementById('result-box');
  if(box) box.style.display='none';
  const qBtn=document.querySelector('.btn-quiz');
  if(qBtn) qBtn.style.display='none'; // still hidden until correct pick
  // Scroll back up to choices
  const wrap=document.querySelector('.story-choice-wrap');
  if(wrap) wrap.scrollIntoView({behavior:'smooth',block:'start'});
}

/* ────────────────────────────────
   MODE B: BATTLE (TIMED QUIZ)
──────────────────────────────── */
let curQ=0, bScore=0, bTotal=0;
function renderBattleMode(e){
  return `
    <div class="sec-ttl">⏳ Quiz Tốc Độ</div>
    <div class="battle-quiz">
      <div class="score-multi" id="b-score">⚡ Điểm x1 · 0/${e.qs.length} câu</div>
      <div class="timer-bar-wrap"><div class="timer-bar" id="timer-bar" style="width:100%"></div></div>
      <div class="timer-label" id="timer-lbl">15s</div>
      <div class="bq-question" id="bq-q"></div>
      <div class="bq-opts" id="bq-opts"></div>
    </div>`;
}
function startTimer(e){
  curQ=0; bScore=0; bTotal=e.qs.length;
  loadQ(e);
}
function loadQ(e){
  if(curQ>=e.qs.length){ endBattle(e); return; }
  const q=e.qs[curQ];
  timeLeft=q.time;
  document.getElementById('bq-q').textContent=`Q${curQ+1}. ${q.q}`;
  document.getElementById('bq-opts').innerHTML=q.opts.map((o,i)=>
    `<button class="bq-opt" onclick="answerBattle(${i})">${String.fromCharCode(65+i)}. ${o}</button>`
  ).join('');
  document.getElementById('b-score').textContent=`⚡ Điểm x${curQ<1?1:2} · ${bScore}/${bTotal} câu`;
  clearInterval(timerInterval);
  timerInterval=setInterval(()=>{
    timeLeft--;
    const pct=(timeLeft/q.time)*100;
    const bar=document.getElementById('timer-bar');
    if(bar){
      bar.style.width=pct+'%';
      bar.style.background=timeLeft>5?'linear-gradient(90deg,#8b0a14,#c01828)':'linear-gradient(90deg,#c01828,#ff4040)';
    }
    const lbl=document.getElementById('timer-lbl');
    if(lbl) lbl.textContent=timeLeft+'s';
    if(timeLeft<=0){
      clearInterval(timerInterval);
      const opts=document.querySelectorAll('.bq-opt');
      opts.forEach(o=>o.disabled=true);
      opts[q.ans].classList.add('correct');
      setTimeout(()=>{ curQ++; loadQ(e); },1000);
    }
  },1000);
}
function answerBattle(idx){
  clearInterval(timerInterval);
  const e=EVS[curEv]; const q=e.qs[curQ];
  const opts=document.querySelectorAll('.bq-opt');
  opts.forEach(o=>o.disabled=true);
  const mult=timeLeft>q.time/2?2:1;
  if(idx===q.ans){
    opts[idx].classList.add('correct');
    bScore++;
    document.getElementById('b-score').textContent=`⚡ Điểm x${mult} · ${bScore}/${bTotal} câu`;
  } else {
    opts[idx].classList.add('wrong');
    opts[q.ans].classList.add('correct');
  }
  setTimeout(()=>{ curQ++; loadQ(e); },900);
}
function endBattle(e){
  const win=bScore>=Math.ceil(e.qs.length/2);
  const earned=win?e.xp*CATS[e.cat].xpMult:Math.floor(e.xp*0.3);
  awardXp(earned,{ type:'battle', title:`Kết quả: ${e.title}`, details:win?`Chiến thắng ${bScore}/${bTotal} câu.`:`Hoàn thành ${bScore}/${bTotal} câu đúng.`, eventId:curEv, category:e.cat, year:e.yr });
  showResult(win,
    win?`🗡️ Chiến Thắng! ${bScore}/${bTotal} câu đúng!`:`🛡 Thất Bại! ${bScore}/${bTotal} câu đúng`,
    e.explain,`+${earned} XP${win&&bScore===e.qs.length?' 🎉 PERFECT!':''}`);
}

/* ────────────────────────────────
   MODE C: TIMELINE (DYNASTY)
──────────────────────────────── */
function renderTimelineMode(e){
  const shuffled=[...e.tlItems].sort(()=>Math.random()-.5);
  tlOrder=shuffled.map(i=>i.id);
  return `
    <div class="sec-ttl">🗒️ Sắp Xếp Timeline</div>
    <p class="timeline-intro">${e.tlTask}</p>
    <div class="tl-items" id="tl-items">
      ${shuffled.map((item,i)=>`
        <div class="tl-item" draggable="true" data-id="${item.id}" data-idx="${i}"
          ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropItem(event)" ondragend="dragEnd(event)">
          <span class="tl-drag-icon">⣿</span>
          <span>${item.text}</span>
          <span class="tl-yr">${item.yr} SCN</span>
        </div>`).join('')}
    </div>
    <button class="tl-check-btn" onclick="checkTimeline()">✔ KIỂM TRA THỨ TỰ</button>`;
}
function initDrag(){}
function dragStart(e){ dragSrc=e.currentTarget; e.currentTarget.classList.add('dragging'); }
function dragEnd(e){ e.currentTarget.classList.remove('dragging'); }
function dragOver(e){ e.preventDefault(); }
function dropItem(e){
  e.preventDefault();
  if(!dragSrc||dragSrc===e.currentTarget) return;
  const container=document.getElementById('tl-items');
  const items=[...container.querySelectorAll('.tl-item')];
  const srcIdx=items.indexOf(dragSrc);
  const tgtIdx=items.indexOf(e.currentTarget);
  if(srcIdx<0||tgtIdx<0) return;
  if(srcIdx<tgtIdx) e.currentTarget.after(dragSrc);
  else e.currentTarget.before(dragSrc);
  tlOrder=([...container.querySelectorAll('.tl-item')]).map(i=>i.dataset.id);
}
function checkTimeline(){
  const e=EVS[curEv];
  const correct=[...e.tlItems].sort((a,b)=>a.order-b.order).map(i=>i.id);
  const items=document.querySelectorAll('.tl-item');
  let allRight=true;
  items.forEach(item=>{
    const id=item.dataset.id;
    const curPos=tlOrder.indexOf(id);
    const correctPos=correct.indexOf(id);
    if(curPos===correctPos) item.classList.add('correct-pos');
    else { item.classList.add('wrong-pos'); allRight=false; }
  });
  document.querySelector('.tl-check-btn').disabled=true;
  const earned=allRight?e.xp*CATS[e.cat].xpMult:Math.floor(e.xp*0.4);
  awardXp(earned,{ type:'timeline', title:`Sắp xếp: ${e.title}`, details:allRight?'Sắp xếp đúng toàn bộ mốc thời gian.':'Đã hoàn thành thử thách timeline.', eventId:curEv, category:e.cat, year:e.yr });
  showResult(allRight,
    allRight?'🏺 Hoàn Hảo! Thứ tự chính xác!':'📋 Gần đúng — xem lại các ô đỏ',
    e.explain,`+${earned} XP`);
}

/* ════════════════════════════════
   SHARED RESULT
════════════════════════════════ */
function showResult(win,ttl,exp,xpTxt){
  const box=document.getElementById('result-box');
  box.className='result-box '+(win?'win':'lose');
  box.style.display='block';
  document.getElementById('r-ttl').textContent=ttl;
  document.getElementById('r-exp').textContent=exp;
  document.getElementById('r-xp').textContent=xpTxt;
  // Show reward section after first game
  const rewardSection = document.getElementById('reward-section');
  if(rewardSection) rewardSection.style.display='block';
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function nextEv(){
  clearInterval(timerInterval);
  if(!quizPassed){
    toast('📝 Hãy hoàn thành bài kiểm tra trước khi tiếp tục!');
    const quizBtn=document.querySelector('.btn-quiz');
    if(quizBtn){ quizBtn.style.animation='pulse-glow .6s ease 2'; setTimeout(()=>quizBtn.style.animation='',1300); }
    return;
  }
  consumeFreePlay();
  if(freeLeft<=0){ go('pay',''); return; }
  logExperience({ type:'complete', title:'Hoàn thành sự kiện', details:curEv && EVS[curEv] ? EVS[curEv].title : getCategoryDisplayName(curCat), eventId:curEv, category:curCat, year:curEv && EVS[curEv] ? EVS[curEv].yr : '' });
  go('map',curCat);
  toast('✓ Hoàn thành sự kiện!');
}
function needPay(){
  toast('🔒 Sự kiện này cần mở khóa');
  setTimeout(()=>go('pay',''),700);
}

/* ════════════════════════════════
   VIDEO / BUY
════════════════════════════════ */
/* YouTube video mapping per event */
const YT_VIDEOS = {
  /* MYTH — real verified YouTube IDs */
  laclong:   'IIu0G7uxCAc', autien:    'IIu0G7uxCAc', sontinhts: '6b_ftItlmuQ',
  andvuong:  'OW14A9dPlms', m_trongthu:'IIu0G7uxCAc', m_chunong: 'yc87q65Xv84',
  m_hungvuong:'nGDnoy9cuQw', m_giongphu:'W7n0A0ei0h4', m_cholua:  'nGDnoy9cuQw',
  m_maiden:  'IIu0G7uxCAc', m_trungquoc:'nGDnoy9cuQw', m_phongtho:'6b_ftItlmuQ',
  m_coloa:   'OW14A9dPlms', m_nothanbao:'OW14A9dPlms', m_mychau:  'OW14A9dPlms',
  m_tuongda: 'OW14A9dPlms', m_rua:     'OW14A9dPlms', m_than:    'IIu0G7uxCAc',
  m_ongdong: 'yc87q65Xv84', m_bachu:   'nGDnoy9cuQw', m_phucuc:  'nGDnoy9cuQw',
  m_tiensau: 'IIu0G7uxCAc', m_dragonking:'IIu0G7uxCAc', m_jade:   'IIu0G7uxCAc',
  m_tamcam:  'WZnlFDGBZQw', m_thachsamh:'MtzDqwoLYIo', m_camrong: 'IIu0G7uxCAc',
  m_trongsong:'6b_ftItlmuQ', m_honvong: 'IIu0G7uxCAc', m_cheoleo: 'yc87q65Xv84',
  /* BATTLE */
  bachang:   'ZPIUuLtRUFY', haiba:     'FC5Rf5daGz0', dinhtien:  'tzTOLih3Goo',
  b_trungvu: 'FC5Rf5daGz0', b_trieuhoa:'FC5Rf5daGz0', b_lynam:   'nGDnoy9cuQw',
  b_khuchua: 'ZPIUuLtRUFY', b_ledai:   'ZPIUuLtRUFY', b_ngoquyen2:'ZPIUuLtRUFY',
  b_lythuong:'qe7VTipMGTg', b_trandao: '5_SMCqWW5L8', b_hatitran:'5_SMCqWW5L8',
  b_chilang:  '7Pvh-6PTpzc', b_lamson:  '7Pvh-6PTpzc',
  /* DYNASTY */
  dinh968:   'tzTOLih3Goo', ly1009:    'qe7VTipMGTg', tran1226:  '5_SMCqWW5L8',
  le1428:    '7Pvh-6PTpzc', d_tienle:  'T3ewSJCiKSM', d_macmac:  'lLM66rDMpl0',
  d_tayon:   'x3lnii_J9jk', d_nguyen:  '96SVntYMrPk',
};

async function _playEventVid(url, fallbackUrl){
  const e=curEv?EVS[curEv]:null;
  document.getElementById('vmod-ttl').textContent=e?e.title:'Video Lịch Sử';
  const player=document.getElementById('vmod-player');
  player.innerHTML='<div class="vsim" style="aspect-ratio:16/9"><div class="vsim-txt">Đang chuẩn bị video...</div></div>';
  document.getElementById('vmodal').classList.add('open');
  const resolvedUrl=await _resolveVideoUrl(url,fallbackUrl);
  _renderMediaInPlayer(player, resolvedUrl, {
    id:'ev-vid',
    title:e?e.title:'Video Lịch Sử',
    fallbackUrl:fallbackUrl && resolvedUrl!==fallbackUrl ? fallbackUrl : '',
    onEnded:closeVid
  });
}
window._playEventVid = _playEventVid;

function playVid(){
  const e=curEv?EVS[curEv]:null;
  const title=e?e.title:'Video Lịch Sử';
  document.getElementById('vmod-ttl').textContent=title;
  const player=document.getElementById('vmod-player');
  const ytId=curEv && YT_VIDEOS[curEv];
  if(ytId){
    player.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>`;
  } else {
    player.innerHTML=`<div class="vsim" id="vsim-fallback"><div class="vsim-txt">Chưa có video cho sự kiện này</div><div class="vsim-bar" id="vsim-bar"></div></div>`;
    const bar=document.getElementById('vsim-bar');
    if(bar){ bar.style.animation='none'; void bar.offsetHeight; bar.style.animation='vplay 5s linear forwards'; }
    vtimer=setTimeout(closeVid,5500);
  }
  document.getElementById('vmodal').classList.add('open');
}
function closeVid(){
  document.getElementById('vmodal').classList.remove('open');
  clearTimeout(vtimer);
  const player=document.getElementById('vmod-player');
  const iframe=player.querySelector('iframe');
  if(iframe) player.innerHTML='';
  const vid=player.querySelector('video');
  if(vid){ vid.pause(); player.innerHTML=''; }
  // Myth wrong-branch video: don't consume free play, show retry button
  if(window._mythBranchActive){
    window._mythBranchActive=false;
    // Insert retry button into outcome area
    const out=document.getElementById('story-outcome');
    if(out){
      const existing=out.querySelector('.btn-watch-vid');
      if(existing) existing.remove();
      if(!out.querySelector('.btn-retry-myth')){
        const retryBtn=document.createElement('button');
        retryBtn.className='btn-retry-myth';
        retryBtn.innerHTML='🔄 Chọn Lại';
        retryBtn.onclick=_retryMythChoice;
        out.appendChild(retryBtn);
      }
    }
    return;
  }
  consumeFreePlay();
  if(freeLeft<=0){ setTimeout(()=>go('pay',''),800); }
  awardXp(10,{ type:'video', title:`Xem video: ${curEv && EVS[curEv] ? EVS[curEv].title : 'Lịch sử'}`, details:'Đã xem video lịch sử.', eventId:curEv, category:curEv && EVS[curEv] ? EVS[curEv].cat : curCat, year:curEv && EVS[curEv] ? EVS[curEv].yr : '' });
  toast('Đã xem video — +10 XP');
}
function buy(plan){
  curPayPlan=plan;
  const names={vip:'🏹 Chiến Binh Thời Gian',basic:'📍 Người Khám Phá'};
  const prices={vip:'49.000 VNĐ / tháng',basic:'19.000 VNĐ / tháng'};
  document.getElementById('pay-plan-title').textContent='Thanh Toán · '+names[plan];
  document.getElementById('pay-name').textContent=names[plan];
  document.getElementById('pay-price').textContent=prices[plan];
  document.getElementById('pay-success').style.display='none';
  document.getElementById('pay-confirm-btn').style.display='block';
  // clear form
  ['pay-card','pay-exp','pay-cvv','pay-name-input'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value='';
  });
  go('payment','');
}
let curPayPlan='vip';
function formatCard(el){
  let v=el.value.replace(/\D/g,'').slice(0,16);
  el.value=v.replace(/(\d{4})/g,'$1 ').trim();
}
function formatExp(el){
  let v=el.value.replace(/\D/g,'');
  if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2,4);
  el.value=v;
}
function confirmPayment(){
  const card=document.getElementById('pay-card').value.replace(/\s/g,'');
  const exp=document.getElementById('pay-exp').value;
  const cvv=document.getElementById('pay-cvv').value;
  const name=document.getElementById('pay-name-input').value.trim();
  if(card.length<12||exp.length<4||cvv.length<3||!name){
    toast('⚠️ Vui lòng điền đủ thông tin'); return;
  }
  const btn=document.getElementById('pay-confirm-btn');
  btn.textContent='⏳ Đang xử lý...';
  btn.disabled=true;
  setTimeout(()=>{
    btn.style.display='none';
    document.getElementById('pay-success').style.display='flex';
  },1800);
}
function activatePlan(){
  freeLeft=99;
  syncHud();
  persistCurrentProfile&&persistCurrentProfile();
  toast('🎉 Đã mở khóa toàn bộ hành trình!');
  go('map',curCat);
}

function secretAdminLogin() {
  // Mở hộp thoại yêu cầu nhập mật khẩu
  const pass = prompt("Nhập mã truy cập Quản trị viên hệ thống Temporal Odyssey:");
  
  // Kiểm tra mật khẩu (bạn có thể đổi 'admin123' thành mật khẩu khác)
  if (pass === "admin123") {
    // 1. Tắt tất cả các màn hình hiện tại đang bật
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // 2. Ẩn thanh thông tin người chơi (nếu đang hiển thị)
    const navInfo = document.getElementById('user-info-nav');
    if(navInfo) navInfo.style.display = 'none';
    
    // 3. Bật màn hình admin và tải dữ liệu
    document.getElementById('s-admin').classList.add('active');
    renderAdminPanel(); // Hàm này đã có ở Bước 2
    
    alert("Xác thực thành công. Chào mừng Quản trị viên!");
  } else if (pass !== null) {
    alert("Sai mã truy cập!");
  }
}

function persistCurrentProfile() {
  persistCurrentProfile_local && persistCurrentProfile_local();
  window._saveProfile && window._saveProfile();
}

// --- CÁC HÀM DÀNH CHO ADMIN ---
function renderAdminPanel() {
  const userListDiv = document.getElementById('admin-user-list');
  // Lấy dữ liệu từ localStorage của game
  let users = JSON.parse(localStorage.getItem('temporal_users') || '{}');
  
  let html = '<table style="width:100%; text-align:left; border-collapse: collapse; min-width: 600px;">';
  html += '<tr style="border-bottom: 1px solid var(--gold);"><th style="padding:10px;">Tên đăng nhập</th><th style="padding:10px;">Mật khẩu</th><th style="padding:10px; text-align:right;">Thao tác</th></tr>';
  
  let count = 0;
  for (let u in users) {
    count++;
    html += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding:10px; font-weight: bold; color: var(--gold2);">${u}</td>
      <td style="padding:10px; opacity: 0.7;">${users[u].password}</td>
      <td style="padding:10px; text-align:right;">
        <button class="btn-ghost" style="padding: 4px 12px; font-size: 14px; color: #f08090; border-color: #f08090;" onclick="adminDeleteUser('${u}')">Xóa</button>
      </td>
    </tr>`;
  }
  html += '</table>';
  
  if(count === 0) {
    html = '<p style="text-align:center; opacity:0.7; padding: 20px 0;">Chưa có người chơi nào đăng ký hệ thống.</p>';
  }
  
  userListDiv.innerHTML = html;
}

function adminDeleteUser(username) {
  if(confirm(`Bạn có chắc muốn xóa vĩnh viễn tài khoản "${username}" không?`)) {
    let users = JSON.parse(localStorage.getItem('temporal_users') || '{}');
    delete users[username];
    localStorage.setItem('temporal_users', JSON.stringify(users));
    renderAdminPanel(); // Tải lại bảng
  }
}

function adminClearAllData() {
  if(confirm('CẢNH BÁO: Hành động này sẽ xóa vĩnh viễn TOÀN BỘ tài khoản. Bạn có chắc chắn?')) {
    localStorage.removeItem('temporal_users');
    renderAdminPanel();
  }
}
// 1. Tự động thêm CSS cho giao diện
const authCSS = `
<style>
/* Container giúp video giữ đúng tỷ lệ 16:9 và co giãn trên mọi màn hình */
.video-responsive {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* Tỷ lệ chuẩn 16:9 */
  margin: 20px 0; /* Khoảng cách trên dưới */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Đổ bóng nhẹ */
}

/* Đảm bảo video lấp đầy container */
.video-responsive iframe,
.video-responsive video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
#s-auth {
  background: radial-gradient(ellipse at 50% 50%, #3a0808 0%, #0d0102 100%);
  align-items: center; justify-content: center;
  position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
  z-index: 99999; display: none; flex-direction: column;
}
#s-auth.active { display: flex !important; }
.auth-wrapper {
  background: rgba(0, 0, 0, 0.85); border: 1px solid var(--gold);
  padding: 40px; border-radius: 8px; text-align: center;
  width: 90%; max-width: 400px; box-shadow: 0 0 30px rgba(201,168,76,.2);
}
.auth-input {
  width: 100%; padding: 12px 15px; margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(201,168,76,.4);
  color: var(--parch); font-family: var(--ui-font); font-size: 18px;
  border-radius: 4px; outline: none;
}
.auth-input:focus { border-color: var(--gold); background: rgba(255, 255, 255, 0.1); }
.auth-err { color: #ff4d4d; margin-bottom: 15px; min-height: 20px; font-size: 16px; }
.auth-switch { margin-top: 20px; color: var(--warm); font-size: 16px; }
.auth-switch span { color: var(--gold2); cursor: pointer; text-decoration: underline; font-weight: bold; }
#user-info-nav { display: none; align-items: center; gap: 15px; font-size:18px; }
</style>
/* Tự động căn chỉnh tỷ lệ 16:9 cho mọi video YouTube trong nội dung */
iframe[src*="youtube.com"] {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 16 / 9; /* Giữ tỷ lệ chuẩn của YouTube */
  border-radius: 8px; /* Bo góc nhẹ cho đẹp */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Đổ bóng */
  display: block;
  margin: 15px 0;
}
`;
// Replaced by the static auth UI defined in the main HTML.

// Chặn hiện tượng nháy đúp (double tap) để phóng to trên iOS (đảm bảo an toàn thêm)
document.addEventListener('dblclick', function(event) {
  event.preventDefault();
}, { passive: false });

// 2. Tự động thêm giao diện HTML
const authHTML = `

<!-- ═══ SIDE MENU (hamburger) ═══ -->
<!-- [REMOVED] duplicate side menu -->
<!-- ═══ CAT SELECT SCREEN ═══ -->
<div id="s-catselect" class="screen">
  <div class="topnav" style="background:linear-gradient(180deg,rgba(0,0,0,.5),transparent)">
    <div class="tnbrand" onclick="go('landing','')" style="cursor:pointer">← TEMPORAL ODYSSEY</div>
    <div style="font-size:13px;color:var(--warm);letter-spacing:1px">Chọn hành trình</div>
  </div>
  <div class="catselect-body">
    <div class="catselect-title">Chọn Hành Trình Của Bạn</div>
    <div class="catselect-sub">Mỗi con đường có cách chơi, độ khó và phần thưởng riêng</div>
    <div class="cats-select">
      <div class="cat cat-sel" data-cat="myth" id="cs-myth" onclick="selectCat('myth')">
        <div class="cat-img">
          <div class="cat-img-ov"></div>
          <div class="cat-em">🪘</div>
        </div>
        <div class="cat-meta">
          <span>⭐ Dễ</span><span>📿 Kể Chuyện</span>
        </div>
        <div class="cat-foot">
          <div class="cat-name">Huyền Thoại</div>
          <div class="cat-pill cat-status" id="cs-myth-status">✅ Mở khóa</div>
        </div>
      </div>

      <div class="cat cat-sel" data-cat="battle" id="cs-battle" onclick="selectCat('battle')">
        <div class="cat-img">
          <div class="cat-img-ov"></div>
          <div class="cat-em">🏹</div>
        </div>
        <div class="cat-meta">
          <span>⭐⭐ Vừa</span><span>⏳ Tốc Độ</span>
        </div>
        <div class="cat-foot">
          <div class="cat-name">Chiến Trận</div>
          <div class="cat-pill cat-status" id="cs-battle-status">🔒 Cần Huyền Thoại bàn 15</div>
        </div>
      </div>

      <div class="cat cat-sel" data-cat="dynasty" id="cs-dynasty" onclick="selectCat('dynasty')">
        <div class="cat-img">
          <div class="cat-img-ov"></div>
          <div class="cat-em">🏺</div>
        </div>
        <div class="cat-meta">
          <span>⭐⭐⭐ Khó</span><span>🗒️ Timeline</span>
        </div>
        <div class="cat-foot">
          <div class="cat-name">Triều Đại</div>
          <div class="cat-pill cat-status" id="cs-dynasty-status">🔒 Cần Chiến Trận bàn 15 + Huyền Thoại bàn 30</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="s-auth" class="screen">
  <div class="auth-wrapper">
    <div id="login-box">
      <h2 class="htitle" style="font-size: 32px; margin-bottom: 20px;">ĐĂNG NHẬP</h2>
      <input type="text" id="login-user" class="auth-input" placeholder="Tên đăng nhập">
      <input type="password" id="login-pass" class="auth-input" placeholder="Mật khẩu">
      <div id="login-err" class="auth-err"></div>
      <button class="btn-main" onclick="handleLogin()">VÀO TRÒ CHƠI</button>
      <p class="auth-switch">Chưa có tài khoản? <span onclick="switchAuth('register')">Đăng ký ngay</span></p>
    </div>
    <div id="register-box" style="display: none;">
      <h2 class="htitle" style="font-size: 32px; margin-bottom: 20px;">ĐĂNG KÝ</h2>
      <input type="text" id="reg-user" class="auth-input" placeholder="Tên đăng nhập">
      <input type="password" id="reg-pass" class="auth-input" placeholder="Mật khẩu">
      <input type="password" id="reg-pass2" class="auth-input" placeholder="Nhập lại mật khẩu">
      <div id="reg-err" class="auth-err"></div>
      <button class="btn-main" onclick="handleRegister()">TẠO TÀI KHOẢN</button>
      <p class="auth-switch">Đã có tài khoản? <span onclick="switchAuth('login')">Đăng nhập</span></p>
    </div>
  </div>
</div>
`;
// Replaced by the static auth UI defined in the main HTML.

// Tùy chọn: thêm hộp video mô phỏng nếu cần
// Mặc định: không chèn trực tiếp nội dung video ở đây, tránh xung đột giao diện
// 3. Tự động thêm Nút Đăng Xuất lên thanh điều hướng
const navLinks = document.querySelector('.tnlinks');
if(false && navLinks) {
  navLinks.insertAdjacentHTML('beforeend', `
    <div id="user-info-nav">
      <span style="color: var(--gold2);">Chào, <b id="nav-username"></b>!</span>
      <span class="tnlink" style="color: #ff4d4d; font-weight:bold; cursor:pointer;" onclick="handleLogout()">Đăng Xuất</span>
    </div>
  `);
}

// 4. Logic Xử Lý Đăng Nhập / Đăng Ký
function switchAuth(mode) {
  document.getElementById('login-box').style.display = mode === 'login' ? 'block' : 'none';
  document.getElementById('register-box').style.display = mode === 'register' ? 'block' : 'none';
  document.getElementById('login-err').textContent = '';
  document.getElementById('reg-err').textContent = '';
}

// [REMOVED] duplicate handleRegister #1

// [REMOVED] duplicate handleLogin/Logout #1

// [REMOVED] duplicate checkAuth #1

const DEMO_USER = 'datascience';
const DEMO_PASS = 'uneti';
const USERS_STORAGE_KEY = 'temporal_users';
const CURRENT_USER_STORAGE_KEY = 'temporal_currentUser';

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
  } catch (error) {
    return {};
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

const PROFILES_STORAGE_KEY = 'temporal_userProfiles';
const DEFAULT_XP = 120;
const DEFAULT_FREE_PLAYS = 5;
let activeProfileUser = '';
let currentJournalTab = 'history';

function getDefaultProfile() {
  return {
    xp: DEFAULT_XP,
    freeLeft: DEFAULT_FREE_PLAYS,
    journal: [],
    updatedAt: new Date().toISOString()
  };
}

function getStoredProfiles() {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_STORAGE_KEY) || '{}');
  } catch (error) {
    return {};
  }
}

function saveStoredProfiles(profiles) {
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
}

function getCurrentUsername() {
  return localStorage.getItem(CURRENT_USER_STORAGE_KEY) || '';
}

function getUserProfile(username) {
  if (!username) {
    return getDefaultProfile();
  }

  const profiles = getStoredProfiles();
  if (!profiles[username]) {
    profiles[username] = getDefaultProfile();
    saveStoredProfiles(profiles);
  }

  return {
    ...getDefaultProfile(),
    ...profiles[username],
    journal: Array.isArray(profiles[username].journal) ? profiles[username].journal : []
  };
}

function getDisplayFreeLeft(value) {
  return value === 99 ? '∞' : String(value);
}

function syncHud() {
  const xpText = String(Number.isFinite(xp) ? xp : DEFAULT_XP);
  const freeText = getDisplayFreeLeft(Number.isFinite(freeLeft) ? freeLeft : DEFAULT_FREE_PLAYS);
  ['xp-disp', 'journal-xp-disp', 'journal-current-xp'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = xpText;
    }
  });
  ['free-disp', 'journal-free-disp', 'journal-current-free'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = freeText;
    }
  });
}

function persistCurrentProfile_local() {
  const username = getCurrentUsername() || activeProfileUser;
  if (!username) {
    return;
  }

  const profiles = getStoredProfiles();
  const base = getUserProfile(username);
  profiles[username] = {
    ...base,
    xp: Number.isFinite(xp) ? xp : DEFAULT_XP,
    freeLeft: Number.isFinite(freeLeft) ? freeLeft : DEFAULT_FREE_PLAYS,
    updatedAt: new Date().toISOString()
  };
  saveStoredProfiles(profiles);
}

function loadCurrentUserState(username) {
  if (!username) {
    activeProfileUser = '';
    xp = DEFAULT_XP;
    freeLeft = DEFAULT_FREE_PLAYS;
    syncHud();
    return;
  }

  const profile = getUserProfile(username);
  activeProfileUser = username;
  xp = Number.isFinite(profile.xp) ? profile.xp : DEFAULT_XP;
  freeLeft = Number.isFinite(profile.freeLeft) ? profile.freeLeft : DEFAULT_FREE_PLAYS;
  syncHud();
}

function getCategoryDisplayName(catKey) {
  const labels = {
    myth: 'Huyền thoại',
    battle: 'Chiến trận',
    dynasty: 'Triều đại'
  };
  return labels[catKey] || 'Hành trình lịch sử';
}

function formatJournalTime(value) {
  if (!value) {
    return 'Vừa xong';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Vừa xong';
  }
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function getJournalTypeLabel(type) {
  const labels = {
    open: 'Bắt đầu',
    story: 'Kể chuyện',
    battle: 'Chiến trận',
    timeline: 'Timeline',
    video: 'Video',
    complete: 'Hoàn thành',
    bookmark: 'Đã lưu',
    unlock: 'Mở khóa'
  };
  return labels[type] || 'Trải nghiệm';
}

function updateProfileRecord(mutator) {
  const username = getCurrentUsername();
  if (!username) {
    return null;
  }

  const profiles = getStoredProfiles();
  const profile = {
    ...getDefaultProfile(),
    ...profiles[username],
    journal: Array.isArray(profiles[username]?.journal) ? profiles[username].journal : []
  };
  mutator(profile);
  profile.updatedAt = new Date().toISOString();
  profiles[username] = profile;
  saveStoredProfiles(profiles);
  activeProfileUser = username;
  return profile;
}

function logExperience(entry) {
  // Delegate to api-layer override when available (saves to backend DB)
  if (typeof window.logExperience === 'function' && window.logExperience !== logExperience) {
    window.logExperience(entry);
    return;
  }

  const username = getCurrentUsername();
  if (!username) {
    return;
  }

  updateProfileRecord((profile) => {
    profile.xp = Number.isFinite(xp) ? xp : DEFAULT_XP;
    profile.freeLeft = Number.isFinite(freeLeft) ? freeLeft : DEFAULT_FREE_PLAYS;
    profile.journal.unshift({
      time: new Date().toISOString(),
      type: entry?.type || 'experience',
      title: entry?.title || 'Trải nghiệm lịch sử',
      details: entry?.details || '',
      category: entry?.category || curCat || '',
      year: entry?.year || '',
      eventId: entry?.eventId || '',
      xpDelta: Number.isFinite(entry?.xpDelta) ? entry.xpDelta : 0
    });
    profile.journal = profile.journal.slice(0, 60);
  });

  if (document.getElementById('s-journal')?.classList.contains('active')) {
    renderJournalScreen();
  }
}

function awardXp(amount, entry) {
  const delta = Number(amount) || 0;
  xp += delta;
  syncHud();
  logExperience({
    ...entry,
    xpDelta: delta
  });
}

function consumeFreePlay() {
  if (freeLeft !== 99) {
    freeLeft = Math.max(0, freeLeft - 1);
  }
  syncHud();
  persistCurrentProfile();
}

function saveCurrentEventToJournal() {
  const eventItem = curEv && EVS[curEv] ? EVS[curEv] : null;
  if (!eventItem) {
    toast('Chưa có sự kiện để lưu.');
    return;
  }

  logExperience({
    type: 'bookmark',
    title: `Lưu sự kiện: ${eventItem.title}`,
    details: `${getCategoryDisplayName(eventItem.cat)} · ${eventItem.yr}`,
    eventId: curEv,
    category: eventItem.cat,
    year: eventItem.yr
  });
  toast('Đã lưu vào Nhật Ký!');
}

function renderJournalHistory(profile) {
  const historyList = document.getElementById('journal-history-list');
  const statsSummary = document.getElementById('journal-stats-summary');
  if (!historyList || !statsSummary) {
    return;
  }

  const journal = Array.isArray(profile.journal) ? profile.journal : [];
  if (!journal.length) {
    historyList.innerHTML = '<div class="journal-empty">Bạn chưa có lượt trải nghiệm nào được lưu.</div>';
  } else {
    historyList.innerHTML = journal.map((item) => `
      <article class="journal-item">
        <div class="journal-item-top">
          <div class="journal-item-title">${escapeHtml(item.title || 'Trải nghiệm lịch sử')}</div>
          <div class="journal-item-xp">${item.xpDelta > 0 ? `+${item.xpDelta} XP` : getJournalTypeLabel(item.type)}</div>
        </div>
        <div class="journal-item-meta">${escapeHtml(item.details || getCategoryDisplayName(item.category))}</div>
        <div class="journal-item-meta">${escapeHtml(formatJournalTime(item.time))}${item.year ? ` · ${escapeHtml(item.year)}` : ''}</div>
      </article>
    `).join('');
  }

  const completedCount = journal.filter((item) => item.type === 'complete').length;
  const savedCount = journal.filter((item) => item.type === 'bookmark').length;
  const scoreCount = journal.filter((item) => Number(item.xpDelta) > 0).length;
  statsSummary.innerHTML = `
    <div class="journal-card">
      <div class="journal-kicker">Tổng hoạt động</div>
      <div class="journal-big">${journal.length}</div>
      <div class="journal-sub">Lượt được lưu trong nhật ký</div>
    </div>
    <div class="journal-card">
      <div class="journal-kicker">Sự kiện hoàn thành</div>
      <div class="journal-big">${completedCount}</div>
      <div class="journal-sub">Bản chơi bạn đã đi qua đến cuối</div>
    </div>
    <div class="journal-card">
      <div class="journal-kicker">Mốc đã lưu</div>
      <div class="journal-big">${savedCount}</div>
      <div class="journal-sub">Sự kiện bạn chủ động lưu lại</div>
    </div>
    <div class="journal-card">
      <div class="journal-kicker">Lần ghi điểm</div>
      <div class="journal-big">${scoreCount}</div>
      <div class="journal-sub">Các lần nhận XP trong hành trình</div>
    </div>
  `;
}

function renderLeaderboard(currentUser) {
  const board = document.getElementById('leaderboard-list');
  const summary = document.getElementById('journal-current-summary');
  const nameBox = document.getElementById('journal-current-user');
  if (!board || !summary || !nameBox) {
    return;
  }

  const profiles = getStoredProfiles();
  if (currentUser && !profiles[currentUser]) {
    profiles[currentUser] = getUserProfile(currentUser);
    saveStoredProfiles(profiles);
  }

  const ranking = Object.entries(profiles)
    .map(([username, profile]) => ({
      username,
      xp: Number.isFinite(profile?.xp) ? profile.xp : DEFAULT_XP,
      freeLeft: Number.isFinite(profile?.freeLeft) ? profile.freeLeft : DEFAULT_FREE_PLAYS,
      updatedAt: profile?.updatedAt || '',
      journalCount: Array.isArray(profile?.journal) ? profile.journal.length : 0
    }))
    .sort((a, b) => {
      if (b.xp !== a.xp) {
        return b.xp - a.xp;
      }
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });

  if (!ranking.length) {
    board.innerHTML = '<div class="leaderboard-empty">Chưa có người chơi nào trên bảng xếp hạng.</div>';
    nameBox.textContent = currentUser || 'Khách';
    summary.textContent = 'Đăng nhập để bắt đầu lưu hành trình và tích điểm.';
    return;
  }

  const foundIndex = ranking.findIndex((item) => item.username === currentUser);
  const currentRank = foundIndex >= 0 ? foundIndex + 1 : ranking.length;
  nameBox.textContent = currentUser || 'Khách';
  summary.textContent = currentUser
    ? `Bạn đang đứng hạng ${currentRank}/${ranking.length} với ${xp} XP.`
    : 'Đăng nhập để bắt đầu lưu hành trình và tích điểm.';

  board.innerHTML = ranking.map((item, index) => `
    <article class="leaderboard-item">
      <div class="leaderboard-top">
        <div class="leaderboard-line">
          <div class="leaderboard-rank">#${index + 1}</div>
          <div>
            <div class="leaderboard-name">${escapeHtml(item.username)}</div>
            <div class="leaderboard-meta">${item.journalCount} hoạt động · ${getDisplayFreeLeft(item.freeLeft)} lượt</div>
          </div>
        </div>
        <div class="leaderboard-score">${item.xp} XP</div>
      </div>
    </article>
  `).join('');
}

function switchJournalTab(tab) {
  currentJournalTab = tab === 'rank' ? 'rank' : 'history';
  const isHistory = currentJournalTab === 'history';
  document.getElementById('journal-tab-history')?.classList.toggle('active', isHistory);
  document.getElementById('journal-tab-rank')?.classList.toggle('active', !isHistory);
  document.getElementById('journal-panel-history')?.classList.toggle('active', isHistory);
  document.getElementById('journal-panel-rank')?.classList.toggle('active', !isHistory);
}

function renderJournalScreen() {
  const username = getCurrentUsername();
  const profile = getUserProfile(username);
  const currentUserNode = document.getElementById('journal-current-user');
  const currentSummaryNode = document.getElementById('journal-current-summary');

  syncHud();
  if (currentUserNode) {
    currentUserNode.textContent = username || 'Khách';
  }
  if (currentSummaryNode) {
    currentSummaryNode.textContent = username
      ? 'Lịch sử trải nghiệm và bảng xếp hạng được lưu trên trình duyệt này.'
      : 'Đăng nhập để bắt đầu lưu hành trình.';
  }

  renderJournalHistory(profile);
  renderLeaderboard(username);
  switchJournalTab(currentJournalTab);
}

function getAuthScreen() {
  return document.querySelector('.auth-screen') || document.getElementById('s-auth');
}

function isDemoAccount(username) {
  return username === DEMO_USER;
}

function isKnownAccount(username, users) {
  return isDemoAccount(username) || Boolean(users[username]) || Boolean(localStorage.getItem("token"));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function cleanupInjectedAuthArtifacts() {
  const authScreens = Array.from(document.querySelectorAll('#s-auth'));
  const preferredAuthScreen = authScreens.find((node) => node.classList.contains('auth-screen')) || authScreens[0];
  authScreens.forEach((node) => {
    if (node !== preferredAuthScreen) {
      node.remove();
    }
  });

  const navInfos = Array.from(document.querySelectorAll('#user-info-nav'));
  const preferredNavInfo = navInfos.find((node) => node.querySelector('.nav-hello')) || navInfos[0];
  navInfos.forEach((node) => {
    if (node !== preferredNavInfo) {
      node.remove();
    }
  });
}

function clearAuthMessages() {
  const loginErr = document.getElementById('login-err');
  const regErr = document.getElementById('reg-err');
  if (loginErr) loginErr.textContent = '';
  if (regErr) regErr.textContent = '';
}

function switchAuth(mode) {
  const isLogin = mode !== 'register';
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  clearAuthMessages();
  if (loginBox) loginBox.classList.toggle('active', isLogin);
  if (registerBox) registerBox.classList.toggle('active', !isLogin);
  if (tabLogin) tabLogin.classList.toggle('active', isLogin);
  if (tabRegister) tabRegister.classList.toggle('active', !isLogin);

  const focusTarget = document.getElementById(isLogin ? 'login-user' : 'reg-user');
  if (focusTarget) {
    focusTarget.focus();
  }
}

function showAuthScreen(mode = 'login') {
  hideSearchModal();
  const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (currentUser) {
    toast(`\u0110ang \u0111\u0103ng nh\u1eadp v\u1edbi t\u00e0i kho\u1ea3n ${currentUser}`);
    return;
  }

  const authScreen = getAuthScreen();
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
  if (authScreen) {
    authScreen.classList.add('active');
  }
  switchAuth(mode);
  window.scrollTo(0, 0);
}

function showSearchModal() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('history-search-input');
  const error = document.getElementById('history-search-error');
  const results = document.getElementById('history-search-results');
  if (error) {
    error.textContent = '';
  }
  if (results) {
    results.classList.remove('active');
    results.innerHTML = '';
  }
  if (modal) {
    modal.classList.add('active');
  }
  if (input) {
    input.focus();
    input.select();
  }
}

function hideSearchModal() {
  const modal = document.getElementById('search-modal');
  const error = document.getElementById('history-search-error');
  const results = document.getElementById('history-search-results');
  if (modal) {
    modal.classList.remove('active');
  }
  if (error) {
    error.textContent = '';
  }
  if (results) {
    results.classList.remove('active');
    results.innerHTML = '';
  }
}

function normalizeHistoryText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function getCategoryName(catKey) {
  const labels = {
    myth: 'Huyền thoại',
    battle: 'Chiến trận',
    dynasty: 'Triều đại'
  };
  return labels[catKey] || catKey;
}

function buildSearchSummary(eventItem) {
  const primary = String(eventItem.story || eventItem.scene || '').trim();
  const secondary = String(eventItem.explain || '').trim();
  if (!primary && !secondary) {
    return 'Chưa có phần tóm tắt chi tiết cho mục này.';
  }
  if (!secondary) {
    return primary;
  }
  return `${primary} ${secondary}`;
}

function getHistoricalSearchResults(keyword) {
  const normalizedKeyword = normalizeHistoryText(keyword);
  if (!normalizedKeyword) {
    return [];
  }

  return Object.entries(EVS)
    .filter(([, eventItem]) => !eventItem.locked)
    .map(([eventKey, eventItem]) => {
      const title = String(eventItem.title || '');
      const story = String(eventItem.story || '');
      const explain = String(eventItem.explain || '');
      const year = String(eventItem.yr || '');
      const category = getCategoryName(eventItem.cat);

      let score = 0;
      const titleText = normalizeHistoryText(title);
      const storyText = normalizeHistoryText(story);
      const explainText = normalizeHistoryText(explain);
      const yearText = normalizeHistoryText(year);
      const categoryText = normalizeHistoryText(category);

      if (titleText.includes(normalizedKeyword)) score += 10;
      if (storyText.includes(normalizedKeyword)) score += 6;
      if (explainText.includes(normalizedKeyword)) score += 5;
      if (yearText.includes(normalizedKeyword)) score += 3;
      if (categoryText.includes(normalizedKeyword)) score += 2;

      normalizedKeyword.split(/\s+/).filter(Boolean).forEach((part) => {
        if (titleText.includes(part)) score += 4;
        if (storyText.includes(part)) score += 2;
        if (explainText.includes(part)) score += 2;
      });

      return {
        key: eventKey,
        score,
        category,
        title,
        yr: year,
        summary: buildSearchSummary(eventItem)
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function renderHistorySearchResults(keyword, matches) {
  const results = document.getElementById('history-search-results');
  if (!results) {
    return;
  }

  if (!matches.length) {
    const googleQuery = encodeURIComponent(`${keyword} lịch sử`);
    const wikiQuery = encodeURIComponent(keyword);
    results.classList.add('active');
    results.innerHTML = `
      <div class="search-result-card">
        <div class="search-result-title">Chưa có tóm tắt phù hợp trong dữ liệu hiện tại</div>
        <div class="search-result-summary">Bạn vẫn có thể xem thêm từ các nguồn bên ngoài để tra cứu chi tiết hơn.</div>
        <div class="search-sources active" style="margin-top:14px;">
          <a class="search-source-link" href="https://www.google.com/search?q=${googleQuery}" target="_blank" rel="noopener">
            <span>Tìm trên Google</span><span>Mở nguồn</span>
          </a>
          <a class="search-source-link" href="https://vi.wikipedia.org/w/index.php?search=${wikiQuery}" target="_blank" rel="noopener">
            <span>Tìm trên Wikipedia tiếng Việt</span><span>Mở nguồn</span>
          </a>
        </div>
      </div>
    `;
    return;
  }

  const primary = matches[0];
  const related = matches.slice(1);
  const googleQuery = encodeURIComponent(`${primary.title} lịch sử Việt Nam`);
  const wikiQuery = encodeURIComponent(primary.title);

  results.classList.add('active');
  results.innerHTML = `
    <div class="search-result-card">
      <div class="search-result-top">
        <div class="search-result-badge">${primary.category}</div>
        <div class="search-result-badge">${primary.yr}</div>
      </div>
      <div class="search-result-title">${primary.title}</div>
      <div class="search-result-summary">${primary.summary}</div>
      ${related.length ? `
        <div class="search-related">
          ${related.map((item) => `
            <div class="search-related-item">
              <strong>${item.title}</strong> · ${item.yr} · ${item.category}
            </div>
          `).join('')}
        </div>
      ` : ''}
      <div class="search-more">
        <button type="button" class="search-more-btn" onclick="toggleSearchSources()">Xem thêm nguồn tham khảo</button>
        <div id="history-search-sources" class="search-sources">
          <a class="search-source-link" href="https://www.google.com/search?q=${googleQuery}" target="_blank" rel="noopener">
            <span>Google: ${primary.title}</span><span>Mở nguồn</span>
          </a>
          <a class="search-source-link" href="https://vi.wikipedia.org/w/index.php?search=${wikiQuery}" target="_blank" rel="noopener">
            <span>Wikipedia tiếng Việt</span><span>Mở nguồn</span>
          </a>
          <a class="search-source-link" href="https://www.google.com/search?q=${encodeURIComponent(`${primary.title} site:baochinhphu.vn OR site:moet.gov.vn OR site:nhandan.vn`) }" target="_blank" rel="noopener">
            <span>Nguồn tham khảo chính thống</span><span>Mở nguồn</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function toggleSearchSources() {
  const sources = document.getElementById('history-search-sources');
  if (sources) {
    sources.classList.toggle('active');
  }
}

function runHistorySearch() {
  const input = document.getElementById('history-search-input');
  const error = document.getElementById('history-search-error');
  const results = document.getElementById('history-search-results');
  const keyword = input ? input.value.trim() : '';

  if (!keyword) {
    if (error) {
      error.textContent = 'Vui lòng nhập từ khóa lịch sử cần tìm.';
    }
    if (results) {
      results.classList.remove('active');
      results.innerHTML = '';
    }
    return;
  }

  if (error) {
    error.textContent = '';
  }

  renderHistorySearchResults(keyword, getHistoricalSearchResults(keyword));
}

const ENHANCED_HISTORY_SEARCH_LIBRARY = [
  {
    key: 'topic-overview',
    title: 'Lịch sử Việt Nam',
    category: 'Tổng quan',
    yr: 'Dòng chảy lịch sử',
    aliases: ['lich su viet nam', 'viet nam', 'viet su', 'su viet nam'],
    summary: 'Lịch sử Việt Nam trải dài từ thời Văn Lang - Âu Lạc, qua hơn một nghìn năm Bắc thuộc, các triều đại độc lập, thời cận đại và hiện đại. Những điểm nổi bật gồm dựng nước, giữ nước, cải cách và giành độc lập dân tộc.'
  },
  {
    key: 'topic-vanlang',
    title: 'Văn Lang - Âu Lạc',
    category: 'Khởi nguồn',
    yr: 'Thời cổ',
    aliases: ['van lang', 'au lac', 'hung vuong', 'an duong vuong', 'co loa'],
    summary: 'Văn Lang và Âu Lạc là giai đoạn hình thành nhà nước sơ khai của người Việt. Truyền thuyết Hùng Vương, An Dương Vương và thành Cổ Loa phản ánh ký ức dựng nước thời đầu.'
  },
  {
    key: 'topic-haibatrung',
    title: 'Hai Bà Trưng',
    category: 'Khởi nghĩa',
    yr: 'Năm 40',
    aliases: ['hai ba trung', 'trung trac', 'trung nhi', 'khoi nghia hai ba trung'],
    summary: 'Khởi nghĩa Hai Bà Trưng năm 40 là biểu tượng tiêu biểu của tinh thần chống Bắc thuộc. Dù giành độc lập trong thời gian ngắn, cuộc khởi nghĩa có ý nghĩa lớn về ý chí tự chủ dân tộc.'
  },
  {
    key: 'topic-bachdang',
    title: 'Chiến thắng Bạch Đằng',
    category: 'Chiến trận',
    yr: '938 - 1288',
    aliases: ['bach dang', 'ngo quyen', 'tran hung dao', 'coc go bach dang'],
    summary: 'Bạch Đằng là biểu tượng của nghệ thuật quân sự Việt Nam. Nổi bật nhất là chiến thắng của Ngô Quyền năm 938 và chiến thắng của Trần Hưng Đạo năm 1288, đều tận dụng địa hình sông nước và bãi cọc.'
  },
  {
    key: 'topic-dinh',
    title: 'Đinh Bộ Lĩnh và Đại Cồ Việt',
    category: 'Triều đại',
    yr: '968',
    aliases: ['dinh bo linh', 'dai co viet', 'hoa lu', 'nha dinh', '12 su quan'],
    summary: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước và lập nhà Đinh năm 968. Việc đặt quốc hiệu Đại Cồ Việt đánh dấu bước củng cố nền độc lập tự chủ sau thời kỳ phân tán.'
  },
  {
    key: 'topic-ly',
    title: 'Nhà Lý và Thăng Long',
    category: 'Triều đại',
    yr: '1009 - 1225',
    aliases: ['nha ly', 'ly cong uan', 'thang long', 'doi do', 'ly thuong kiet'],
    summary: 'Nhà Lý mở ra thời kỳ ổn định lâu dài với quyết định dời đô ra Thăng Long năm 1010. Triều đại này ghi dấu ở tổ chức nhà nước, văn hóa Phật giáo và chiến thắng chống Tống của Lý Thường Kiệt.'
  },
  {
    key: 'topic-tran',
    title: 'Nhà Trần và kháng chiến chống Nguyên Mông',
    category: 'Triều đại',
    yr: '1225 - 1400',
    aliases: ['nha tran', 'tran hung dao', 'nguyen mong', 'mong nguyen', 'khang chien nha tran'],
    summary: 'Nhà Trần nổi bật với ba lần đánh bại quân Nguyên Mông vào các năm 1258, 1285 và 1288. Đây là một trong những giai đoạn quân sự rực rỡ nhất của lịch sử Việt Nam.'
  },
  {
    key: 'topic-lamson',
    title: 'Khởi nghĩa Lam Sơn và Bình Ngô Đại Cáo',
    category: 'Khởi nghĩa',
    yr: '1418 - 1428',
    aliases: ['lam son', 'le loi', 'nguyen trai', 'binh ngo dai cao', 'nha le so'],
    summary: 'Khởi nghĩa Lam Sơn do Lê Lợi lãnh đạo đã kết thúc ách đô hộ của nhà Minh. Bình Ngô Đại Cáo do Nguyễn Trãi soạn được xem là bản tuyên ngôn độc lập nổi bật của dân tộc.'
  },
  {
    key: 'topic-nguyen',
    title: 'Nhà Nguyễn',
    category: 'Triều đại',
    yr: '1802 - 1945',
    aliases: ['nha nguyen', 'gia long', 'minh mang', 'hue', 'trieu nguyen'],
    summary: 'Nhà Nguyễn là triều đại quân chủ cuối cùng của Việt Nam. Giai đoạn này gắn với việc thống nhất lãnh thổ, cải cách hành chính, đồng thời đối diện với áp lực xâm lược và thuộc địa hóa.'
  },
  {
    key: 'topic-august',
    title: 'Cách mạng Tháng Tám và Quốc khánh 2/9',
    category: 'Hiện đại',
    yr: '1945',
    aliases: ['cach mang thang tam', '2 9', 'doc lap', 'ho chi minh', 'tuyen ngon doc lap'],
    summary: 'Cách mạng Tháng Tám năm 1945 đưa đến sự ra đời của nước Việt Nam Dân chủ Cộng hòa. Tuyên ngôn Độc lập ngày 2/9/1945 là mốc mở đầu cho một nhà nước độc lập hiện đại.'
  },
  {
    key: 'topic-dienbien',
    title: 'Chiến thắng Điện Biên Phủ',
    category: 'Chiến trận',
    yr: '1954',
    aliases: ['dien bien phu', 'vo nguyen giap', 'chien dich dien bien phu', '1954'],
    summary: 'Chiến thắng Điện Biên Phủ năm 1954 là một mốc lớn trong lịch sử hiện đại Việt Nam. Kết quả này góp phần chấm dứt chiến tranh Đông Dương và dẫn tới Hiệp định Geneve.'
  }
];

const ENHANCED_HISTORY_SEARCH_SYNONYMS = {
  ngoquyen: ['ngo quyen', 'bach dang', '938'],
  tranhungdao: ['tran hung dao', 'bach dang', '1288', 'nguyen mong'],
  lydynasty: ['nha ly', 'ly cong uan', 'thang long', 'ly thuong kiet'],
  leloi: ['le loi', 'lam son', 'binh ngo dai cao', 'nguyen trai'],
  vietnam: ['viet nam', 'lich su viet nam', 'dai viet', 'dai co viet']
};

function repairHistoryText(value) {
  const text = String(value || '').trim();
  if (!text) {
    return '';
  }

  try {
    const repaired = decodeURIComponent(escape(text));
    if (repaired && repaired !== text) {
      return repaired;
    }
  } catch (error) {
    // Keep original text when it is already correct.
  }

  return text;
}

function normalizeHistoryText(value) {
  return repairHistoryText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getCategoryName(catKey) {
  const labels = {
    myth: 'Huyền thoại',
    battle: 'Chiến trận',
    dynasty: 'Triều đại'
  };
  return labels[catKey] || repairHistoryText(catKey);
}

function buildSearchSummary(eventItem) {
  const primary = repairHistoryText(eventItem.story || eventItem.scene || '');
  const secondary = repairHistoryText(eventItem.explain || '');
  if (!primary && !secondary) {
    return 'Chưa có phần tóm tắt chi tiết cho mục này.';
  }
  if (!secondary) {
    return primary;
  }
  return `${primary} ${secondary}`;
}

function getSearchTokens(keyword) {
  return normalizeHistoryText(keyword)
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function getExpandedSearchTokens(keyword) {
  const baseTokens = getSearchTokens(keyword);
  const expanded = new Set(baseTokens);
  const normalizedKeyword = normalizeHistoryText(keyword);

  Object.values(ENHANCED_HISTORY_SEARCH_SYNONYMS).forEach((terms) => {
    const normalizedTerms = terms.map((term) => normalizeHistoryText(term));
    if (normalizedTerms.some((term) => normalizedKeyword.includes(term) || term.includes(normalizedKeyword))) {
      normalizedTerms.forEach((term) => {
        expanded.add(term);
        term.split(' ').filter(Boolean).forEach((part) => expanded.add(part));
      });
    }
  });

  return Array.from(expanded);
}

function buildEventSearchEntry(eventKey, eventItem) {
  const title = repairHistoryText(eventItem.title || '');
  const story = repairHistoryText(eventItem.story || '');
  const explain = repairHistoryText(eventItem.explain || '');
  const year = repairHistoryText(eventItem.yr || '');
  const category = getCategoryName(eventItem.cat);

  return {
    key: eventKey,
    title,
    yr: year,
    category,
    summary: buildSearchSummary(eventItem),
    aliases: [title, category, year],
    searchCorpus: `${title} ${story} ${explain} ${category} ${year}`,
    kind: 'event'
  };
}

function buildTopicSearchEntry(item) {
  return {
    key: item.key,
    title: item.title,
    yr: item.yr,
    category: item.category,
    summary: item.summary,
    aliases: Array.isArray(item.aliases) ? item.aliases : [],
    searchCorpus: `${item.title} ${item.summary} ${(item.aliases || []).join(' ')} ${item.category} ${item.yr}`,
    kind: 'topic'
  };
}

function scoreSearchEntry(entry, keyword, tokens) {
  const normalizedKeyword = normalizeHistoryText(keyword);
  const titleText = normalizeHistoryText(entry.title);
  const summaryText = normalizeHistoryText(entry.summary);
  const categoryText = normalizeHistoryText(entry.category);
  const aliasText = normalizeHistoryText((entry.aliases || []).join(' '));
  const corpusText = normalizeHistoryText(entry.searchCorpus);

  let score = 0;
  if (titleText === normalizedKeyword) score += 80;
  if (aliasText.includes(normalizedKeyword)) score += 50;
  if (titleText.includes(normalizedKeyword)) score += 36;
  if (summaryText.includes(normalizedKeyword)) score += 24;
  if (corpusText.includes(normalizedKeyword)) score += 18;
  if (categoryText.includes(normalizedKeyword)) score += 10;

  tokens.forEach((token) => {
    if (titleText.includes(token)) score += 12;
    if (aliasText.includes(token)) score += 10;
    if (summaryText.includes(token)) score += 6;
    if (corpusText.includes(token)) score += 4;
  });

  if (tokens.length && tokens.every((token) => corpusText.includes(token))) {
    score += 18;
  }

  return score;
}

function getFallbackSearchResult(keyword) {
  const normalizedKeyword = normalizeHistoryText(keyword);
  let summary = `Chủ đề "${keyword}" chưa có bài tóm tắt riêng trong dữ liệu nội bộ. Bạn có thể dùng phần nguồn tham khảo bên dưới để xem thêm thông tin đáng tin cậy.`;

  if (normalizedKeyword.includes('trieu') || normalizedKeyword.includes('nha')) {
    summary = 'Đây nhiều khả năng là một chủ đề về triều đại hoặc giai đoạn cầm quyền. Khi tra cứu lịch sử, bạn nên xem các mốc thành lập, nhân vật trung tâm, cải cách nổi bật và nguyên nhân suy yếu của giai đoạn này.';
  } else if (normalizedKeyword.includes('chien') || normalizedKeyword.includes('tran') || normalizedKeyword.includes('khoi nghia')) {
    summary = 'Đây nhiều khả năng là một chủ đề về chiến trận hoặc khởi nghĩa. Trọng tâm nên xem là bối cảnh, lực lượng tham chiến, chiến thuật, kết quả và ý nghĩa lịch sử của sự kiện.';
  } else if (normalizedKeyword.includes('nhan vat') || normalizedKeyword.includes('la ai')) {
    summary = 'Đây nhiều khả năng là một chủ đề về nhân vật lịch sử. Bạn nên tra cứu niên đại, vai trò, đóng góp chính và bối cảnh lịch sử gắn với nhân vật đó.';
  }

  return {
    key: `fallback-${normalizedKeyword || 'history'}`,
    title: `Tra cứu lịch sử: ${keyword}`,
    yr: 'Mở rộng',
    category: 'Tra cứu mở rộng',
    summary,
    aliases: [keyword],
    searchCorpus: keyword,
    kind: 'fallback'
  };
}

function getHistoricalSearchResults(keyword) {
  const normalizedKeyword = normalizeHistoryText(keyword);
  if (!normalizedKeyword) {
    return [];
  }

  const tokens = getExpandedSearchTokens(keyword);
  const entries = [
    ...Object.entries(EVS)
      .filter(([, eventItem]) => !eventItem.locked)
      .map(([eventKey, eventItem]) => buildEventSearchEntry(eventKey, eventItem)),
    ...ENHANCED_HISTORY_SEARCH_LIBRARY.map((item) => buildTopicSearchEntry(item))
  ];

  const deduped = new Map();
  entries.forEach((entry) => {
    const score = scoreSearchEntry(entry, keyword, tokens);
    if (score <= 0) {
      return;
    }

    const dedupeKey = normalizeHistoryText(entry.title);
    const previous = deduped.get(dedupeKey);
    const enriched = { ...entry, score };
    if (!previous || previous.score < score) {
      deduped.set(dedupeKey, enriched);
    }
  });

  return Array.from(deduped.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function renderHistorySearchResults(keyword, matches) {
  const results = document.getElementById('history-search-results');
  if (!results) {
    return;
  }

  const safeMatches = matches.length ? matches : [getFallbackSearchResult(keyword)];
  const primary = safeMatches[0];
  const related = safeMatches.slice(1);
  const googleQuery = encodeURIComponent(`${primary.title} lịch sử Việt Nam`);
  const wikiQuery = encodeURIComponent(primary.title);
  const officialQuery = encodeURIComponent(`${primary.title} site:moet.gov.vn OR site:nhandan.vn OR site:baochinhphu.vn`);

  results.classList.add('active');
  results.innerHTML = `
    <div class="search-result-card">
      <div class="search-result-top">
        <div class="search-result-badge">${escapeHtml(primary.category)}</div>
        <div class="search-result-badge">${escapeHtml(primary.yr)}</div>
      </div>
      <div class="search-result-title">${escapeHtml(primary.title)}</div>
      <div class="search-result-summary">${escapeHtml(primary.summary)}</div>
      ${primary.kind === 'fallback' ? `
        <div class="search-related" style="margin-top:14px;">
          <div class="search-related-item">
            Không tìm thấy mục khớp trực tiếp trong dữ liệu nội bộ, hệ thống đang trả về gợi ý tra cứu mở rộng cho chủ đề bạn nhập.
          </div>
        </div>
      ` : ''}
      ${related.length ? `
        <div class="search-related">
          ${related.map((item) => `
            <div class="search-related-item">
              <strong>${escapeHtml(item.title)}</strong> · ${escapeHtml(item.yr)} · ${escapeHtml(item.category)}
            </div>
          `).join('')}
        </div>
      ` : ''}
      <div class="search-more">
        <button type="button" class="search-more-btn" onclick="toggleSearchSources()">Xem thêm nguồn tham khảo</button>
        <div id="history-search-sources" class="search-sources">
          <a class="search-source-link" href="https://www.google.com/search?q=${googleQuery}" target="_blank" rel="noopener">
            <span>Google: ${primary.title}</span><span>Mở nguồn</span>
          </a>
          <a class="search-source-link" href="https://vi.wikipedia.org/w/index.php?search=${wikiQuery}" target="_blank" rel="noopener">
            <span>Wikipedia tiếng Việt</span><span>Mở nguồn</span>
          </a>
          <a class="search-source-link" href="https://www.google.com/search?q=${officialQuery}" target="_blank" rel="noopener">
            <span>Nguồn tham khảo chính thống</span><span>Mở nguồn</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function hideAuthScreen() {
  if (!localStorage.getItem(CURRENT_USER_STORAGE_KEY)) {
    return;
  }
  const authScreen = getAuthScreen();
  if (authScreen) {
    authScreen.classList.remove('active');
  }

  const activeNonAuthScreen = Array.from(document.querySelectorAll('.screen.active')).find((screen) => screen.id !== 's-auth');
  if (!activeNonAuthScreen) {
    document.getElementById('s-landing').classList.add('active');
  }
}

function handleRegister() {
  const usernameInput = document.getElementById('reg-user');
  const passwordInput = document.getElementById('reg-pass');
  const confirmInput = document.getElementById('reg-pass2');
  const errorBox = document.getElementById('reg-err');
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;
  const users = getStoredUsers();

  errorBox.textContent = '';

  if (!username || !password || !confirmPassword) {
    errorBox.textContent = 'Vui l\u00f2ng nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin.';
    return;
  }

  if (/\s/.test(username)) {
    errorBox.textContent = 'T\u00ean \u0111\u0103ng nh\u1eadp kh\u00f4ng \u0111\u01b0\u1ee3c c\u00f3 kho\u1ea3ng tr\u1eafng.';
    return;
  }

  if (username.length < 3) {
    errorBox.textContent = 'T\u00ean \u0111\u0103ng nh\u1eadp c\u1ea7n \u00edt nh\u1ea5t 3 k\u00fd t\u1ef1.';
    return;
  }

  if (isDemoAccount(username)) {
    errorBox.textContent = 'T\u00ean \u0111\u0103ng nh\u1eadp n\u00e0y \u0111\u00e3 \u0111\u01b0\u1ee3c d\u00f9ng cho t\u00e0i kho\u1ea3n demo.';
    return;
  }

  if (users[username]) {
    errorBox.textContent = 'T\u00ean \u0111\u0103ng nh\u1eadp \u0111\u00e3 t\u1ed3n t\u1ea1i.';
    return;
  }

  if (password.length < 4) {
    errorBox.textContent = 'M\u1eadt kh\u1ea9u c\u1ea7n \u00edt nh\u1ea5t 4 k\u00fd t\u1ef1.';
    return;
  }

  if (password !== confirmPassword) {
    errorBox.textContent = 'M\u1eadt kh\u1ea9u nh\u1eadp l\u1ea1i kh\u00f4ng kh\u1edbp.';
    return;
  }

  users[username] = {
    password,
    createdAt: new Date().toISOString()
  };
  saveStoredUsers(users);

  // Register on backend for JWT
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(r => r.json()).then(data => {
    if (data.access_token) localStorage.setItem('token', data.access_token);
  }).catch(() => {});

  localStorage.setItem(CURRENT_USER_STORAGE_KEY, username);
  usernameInput.value = '';
  passwordInput.value = '';
  confirmInput.value = '';
  checkAuth();
  toast('\u0110\u0103ng k\u00fd th\u00e0nh c\u00f4ng');
}

function handleLogin() {
  const usernameInput = document.getElementById('login-user');
  const passwordInput = document.getElementById('login-pass');
  const errorBox = document.getElementById('login-err');
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const users = getStoredUsers();

  errorBox.textContent = '';

  if (!username || !password) {
    errorBox.textContent = 'Vui l\u00f2ng nh\u1eadp t\u00ean \u0111\u0103ng nh\u1eadp v\u00e0 m\u1eadt kh\u1ea9u.';
    return;
  }

  // Try backend login first for JWT token
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(r => r.json()).then(data => {
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, username);
      // Apply backend XP and free plays
      if (data.xp !== undefined) xp = data.xp;
      if (data.free_left !== undefined) freeLeft = data.free_left;
      syncHud();
      persistCurrentProfile();
      passwordInput.value = '';
      checkAuth();
      toast('Xin ch\u00e0o ' + username);
    } else {
      // Fallback to local auth
      if ((username === DEMO_USER && password === DEMO_PASS) || (users[username] && users[username].password === password)) {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, username);
        passwordInput.value = '';
        checkAuth();
        toast('Xin ch\u00e0o ' + username);
      } else {
        errorBox.textContent = data.detail || 'Sai t\u00ean \u0111\u0103ng nh\u1eadp ho\u1eb7c m\u1eadt kh\u1ea9u.';
      }
    }
  }).catch(() => {
    // Offline fallback
    if ((username === DEMO_USER && password === DEMO_PASS) || (users[username] && users[username].password === password)) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, username);
      passwordInput.value = '';
      checkAuth();
      toast('Xin ch\u00e0o ' + username);
    } else {
      errorBox.textContent = 'Sai t\u00ean \u0111\u0103ng nh\u1eadp ho\u1eb7c m\u1eadt kh\u1ea9u.';
    }
  });
}

function handleLogout() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  localStorage.removeItem('token');
  checkAuth();
  toast('\u0110\u00e3 \u0111\u0103ng xu\u1ea5t');
}

function renderAdminPanel() {
  const userListDiv = document.getElementById('admin-user-list');
  const users = getStoredUsers();
  const usernames = Object.keys(users).sort((a, b) => a.localeCompare(b));

  if (!userListDiv) {
    return;
  }

  if (usernames.length === 0) {
    userListDiv.innerHTML = `
      <div style="text-align:center; opacity:.82; line-height:1.7;">
        <p>Ch\u01b0a c\u00f3 t\u00e0i kho\u1ea3n \u0111\u0103ng k\u00fd n\u00e0o \u0111\u01b0\u1ee3c l\u01b0u.</p>
        <p style="margin-top:10px; color: var(--gold2);">T\u00e0i kho\u1ea3n demo m\u1eb7c \u0111\u1ecbnh: ${DEMO_USER} / ${DEMO_PASS}</p>
      </div>
    `;
    return;
  }

  const rows = usernames.map((username) => `
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding:10px; font-weight:bold; color:var(--gold2);">${escapeHtml(username)}</td>
      <td style="padding:10px; opacity:.78;">${escapeHtml(users[username].password)}</td>
      <td style="padding:10px; opacity:.58;">${escapeHtml((users[username].createdAt || '').slice(0, 10) || '-')}</td>
      <td style="padding:10px; text-align:right;">
        <button class="btn-ghost" style="padding:4px 12px; font-size:14px; color:#f08090; border-color:#f08090;" onclick='adminDeleteUser(${JSON.stringify(username)})'>Xóa</button>
      </td>
    </tr>
  `).join('');

  userListDiv.innerHTML = `
    <div style="margin-bottom:12px; color: var(--gold2); opacity:.8;">T\u00e0i kho\u1ea3n demo m\u1eb7c \u0111\u1ecbnh: ${DEMO_USER} / ${DEMO_PASS}</div>
    <table style="width:100%; text-align:left; border-collapse:collapse; min-width:640px;">
      <tr style="border-bottom:1px solid var(--gold);">
        <th style="padding:10px;">T\u00ean \u0111\u0103ng nh\u1eadp</th>
        <th style="padding:10px;">M\u1eadt kh\u1ea9u</th>
        <th style="padding:10px;">Ng\u00e0y l\u01b0u</th>
        <th style="padding:10px; text-align:right;">Thao t\u00e1c</th>
      </tr>
      ${rows}
    </table>
  `;
}

function adminDeleteUser(username) {
  const users = getStoredUsers();
  if (!users[username]) {
    return;
  }

  if (!confirm(`B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n x\u00f3a t\u00e0i kho\u1ea3n "${username}"?`)) {
    return;
  }

  delete users[username];
  saveStoredUsers(users);

  if (localStorage.getItem(CURRENT_USER_STORAGE_KEY) === username) {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }

  renderAdminPanel();
  checkAuth();
}

function adminClearAllData() {
  if (!confirm('B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n x\u00f3a to\u00e0n b\u1ed9 t\u00e0i kho\u1ea3n \u0111\u00e3 \u0111\u0103ng k\u00fd?')) {
    return;
  }

  localStorage.removeItem(USERS_STORAGE_KEY);
  const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (currentUser && !isDemoAccount(currentUser)) {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }

  renderAdminPanel();
  checkAuth();
}

function secretAdminLogin() {
  const pass = prompt('Nh\u1eadp m\u00e3 truy c\u1eadp Qu\u1ea3n tr\u1ecb vi\u00ean h\u1ec7 th\u1ed1ng Temporal Odyssey:');
  if (pass === null) {
    return;
  }

  if (pass !== 'admin123') {
    alert('Sai m\u00e3 truy c\u1eadp!');
    return;
  }

  document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
  const navInfo = document.getElementById('user-info-nav');
  if (navInfo) {
    navInfo.style.display = 'none';
  }
  document.getElementById('s-admin').classList.add('active');
  renderAdminPanel();
  alert('X\u00e1c th\u1ef1c th\u00e0nh c\u00f4ng. Ch\u00e0o m\u1eebng Qu\u1ea3n tr\u1ecb vi\u00ean!');
}

// [REMOVED] duplicate checkAuth #2

function initializeAuthUI() {
  cleanupInjectedAuthArtifacts();

  ['login-user', 'login-pass'].forEach((id) => {
    const element = document.getElementById(id);
    if (!element || element.dataset.enterBound === 'true') {
      return;
    }
    element.dataset.enterBound = 'true';
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    });
  });

  ['reg-user', 'reg-pass', 'reg-pass2'].forEach((id) => {
    const element = document.getElementById(id);
    if (!element || element.dataset.enterBound === 'true') {
      return;
    }
    element.dataset.enterBound = 'true';
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleRegister();
      }
    });
  });

  const historyInput = document.getElementById('history-search-input');
  if (historyInput && historyInput.dataset.enterBound !== 'true') {
    historyInput.dataset.enterBound = 'true';
    historyInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        runHistorySearch();
      }
      if (event.key === 'Escape') {
        hideSearchModal();
      }
    });
  }

  checkAuth();
}

function setupJournalBindings() {
  const saveButton = document.querySelector('#s-event .bnav .bni:nth-child(3)');
  if (saveButton) {
    saveButton.onclick = saveCurrentEventToJournal;
  }
}

// buy() defined above

function adminDeleteUser(username) {
  const users = getStoredUsers();
  if (!users[username]) {
    return;
  }

  if (!confirm(`Bạn có chắc muốn xóa tài khoản "${username}"?`)) {
    return;
  }

  delete users[username];
  saveStoredUsers(users);

  const profiles = getStoredProfiles();
  delete profiles[username];
  saveStoredProfiles(profiles);

  if (getCurrentUsername() === username) {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }

  renderAdminPanel();
  checkAuth();
}

function adminClearAllData() {
  if (!confirm('Bạn có chắc muốn xóa toàn bộ tài khoản đã đăng ký?')) {
    return;
  }

  localStorage.removeItem(USERS_STORAGE_KEY);
  localStorage.removeItem(PROFILES_STORAGE_KEY);

  const currentUser = getCurrentUsername();
  if (currentUser && !isDemoAccount(currentUser)) {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }

  renderAdminPanel();
  checkAuth();
}

function checkAuth() {
  const users = getStoredUsers();
  let currentUser = getCurrentUsername();
  const authScreen = getAuthScreen();
  const navInfo = document.getElementById('user-info-nav');
  const navUsername = document.getElementById('nav-username');
  const loginLink = document.getElementById('nav-login-link');

  if (currentUser && !isKnownAccount(currentUser, users)) {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    currentUser = '';
  }

  if (currentUser) {
    loadCurrentUserState(currentUser);
    document.body.classList.add('logged-in');
    if (authScreen) {
      authScreen.classList.remove('active');
    }
    if (navInfo) {
      navInfo.style.display = 'flex';
    }
    if (navUsername) {
      navUsername.textContent = currentUser;
    }
    if (loginLink) {
      loginLink.style.display = 'none';
    }
    // Sync side menu
    var su = document.getElementById('side-username');
    if (su) su.textContent = currentUser;

    const activeNonAuthScreen = Array.from(document.querySelectorAll('.screen.active')).find((screen) => screen.id !== 's-auth');
    if (!activeNonAuthScreen) {
      document.getElementById('s-landing').classList.add('active');
    }
    if (document.getElementById('s-journal')?.classList.contains('active')) {
      renderJournalScreen();
    }
    return;
  }

  activeProfileUser = '';
  xp = DEFAULT_XP;
  freeLeft = DEFAULT_FREE_PLAYS;
  syncHud();

  if (navInfo) {
    navInfo.style.display = 'none';
  }
  if (loginLink) {
    loginLink.style.display = 'block';
  }
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
  if (authScreen) {
    authScreen.classList.add('active');
  }
  switchAuth('login');
}


/* ════════════════════════════════
   INTRO POPUP
════════════════════════════════ */
function showIntro(){document.getElementById('intro-popup').classList.add('show');}
function hideIntro(){document.getElementById('intro-popup').classList.remove('show');}
function toggleIntro(){const p=document.getElementById('intro-popup');p.classList.toggle('show');}
document.addEventListener('click',function(e){
  if(!e.target.closest('#intro-btn-wrap')) hideIntro();
});

/* ════════════════════════════════
   LANGUAGE SELECTOR
════════════════════════════════ */
let currentLang='vi';
function toggleLangMenu(){document.getElementById('lang-menu').classList.toggle('show');}
function setLang(lang){
  currentLang=lang;
  const labels={vi:'VI',en:'EN',zh:'中'};
  document.getElementById('lang-label').textContent=labels[lang]||lang.toUpperCase();
  document.querySelectorAll('.lang-opt').forEach(o=>o.classList.remove('active'));
  document.querySelector(`.lang-opt[onclick*="'${lang}'"]`)?.classList.add('active');
  document.getElementById('lang-menu').classList.remove('show');
  toast('Ngôn ngữ: '+lang.toUpperCase()+' (đang phát triển)');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.lang-sel-wrap')) document.getElementById('lang-menu')?.classList.remove('show');
});

/* ════════════════════════════════
   SIDE MENU
════════════════════════════════ */
function toggleSideMenu(){
  document.getElementById('side-menu').classList.toggle('open');
  document.getElementById('side-menu-overlay').classList.toggle('show');
  // Update user info
  const u=getCurrentUsername&&getCurrentUsername()||'Khách';
  document.getElementById('side-username').textContent=u;
  document.getElementById('side-xp').textContent=xp+' XP';
  updateSideMenuProgress();
}
function closeSideMenu(){
  document.getElementById('side-menu').classList.remove('open');
  document.getElementById('side-menu-overlay').classList.remove('show');
}
function updateSideMenuProgress(){
  const mythPlayed=getPlayedCount('myth');
  const battlePlayed=getPlayedCount('battle');
  const battleUnlocked=mythPlayed>=15;
  const dynastyUnlocked=battlePlayed>=15&&mythPlayed>=30;
  
  const bb=document.getElementById('side-badge-battle');
  const bd=document.getElementById('side-badge-dynasty');
  if(bb){
    if(battleUnlocked){bb.textContent='✅ Mở khóa';bb.className='side-unlock-badge unlocked';}
    else{bb.textContent='HT bàn '+(mythPlayed)+'/15';bb.className='side-unlock-badge';}
  }
  if(bd){
    if(dynastyUnlocked){bd.textContent='✅ Mở khóa';bd.className='side-unlock-badge unlocked';}
    else{bd.textContent='CT '+battlePlayed+'/15 + HT '+mythPlayed+'/30';bd.className='side-unlock-badge';}
  }
}

/* ════════════════════════════════
   UNLOCK LOGIC
════════════════════════════════ */
function getPlayedCount(cat){
  // Count completed (non-locked) events in this category
  const C=CATS[cat];
  let count=0;
  C.eras.forEach(era=>{
    era.events.forEach(eid=>{
      const ev=EVS[eid];
      if(ev&&!ev.locked) count++;
    });
  });
  // In a real app, this would track actual completions
  // For demo, use xp as proxy or localStorage
  try{
    const profile=JSON.parse(localStorage.getItem('to_played_'+cat)||'0');
    return typeof profile==='number'?profile:count;
  }catch{return 0;}
}
function recordPlay(cat){
  try{
    const cur=getPlayedCount(cat);
    localStorage.setItem('to_played_'+cat,JSON.stringify(cur+1));
  }catch{}
}
function isCatUnlocked(cat){
  if(cat==='myth') return true;
  if(cat==='battle') return getPlayedCount('myth')>=15;
  if(cat==='dynasty') return getPlayedCount('battle')>=15 && getPlayedCount('myth')>=30;
  return false;
}

/* ════════════════════════════════
   CAT SELECT SCREEN
════════════════════════════════ */
function renderCatSelect(){
  ['myth','battle','dynasty'].forEach(cat=>{
    const el=document.getElementById('cs-'+cat);
    const statusEl=document.getElementById('cs-'+cat+'-status');
    if(!el||!statusEl) return;
    // Remove old overlay
    el.querySelector('.cat-locked-overlay')?.remove();
    const unlocked=isCatUnlocked(cat);
    if(unlocked){
      el.classList.remove('locked-cat');
      statusEl.textContent='✅ Mở khóa';
      statusEl.style.background='rgba(100,200,80,.15)';
      statusEl.style.borderColor='rgba(100,200,80,.3)';
      statusEl.style.color='#7fdb5a';
    } else {
      el.classList.add('locked-cat');
      const msgs={
        battle:'🔒 Cần Huyền Thoại bàn 15 (hiện: '+getPlayedCount('myth')+')',
        dynasty:'🔒 CT bàn 15 ('+getPlayedCount('battle')+') + HT bàn 30 ('+getPlayedCount('myth')+')'
      };
      statusEl.textContent=msgs[cat]||'🔒 Chưa mở khóa';
      statusEl.style.background='rgba(0,0,0,.3)';
      statusEl.style.borderColor='rgba(255,255,255,.1)';
      statusEl.style.color='#888';
      // Add lock overlay
      const ov=document.createElement('div');
      ov.className='cat-locked-overlay';
      ov.innerHTML='<div class="lock-icon">🔒</div><div class="lock-msg">'+msgs[cat]+'</div>';
      el.style.position='relative';
      el.appendChild(ov);
    }
  });
}

function selectCat(cat){
  if(!isCatUnlocked(cat)){
    const msgs={
      battle:'🔒 Cần chơi Huyền Thoại đến bàn 15 để mở khóa Chiến Trận!',
      dynasty:'🔒 Cần Chiến Trận bàn 15 và Huyền Thoại bàn 30 để mở khóa Triều Đại!'
    };
    toast(msgs[cat]||'Chưa mở khóa!');
    return;
  }
  go('map',cat);
}

// Override go() để render catselect khi cần
const _goOrig=go;
go=function(screen,cat){
  _goOrig(screen,cat);
  if(screen==='catselect') renderCatSelect();
  // Update side menu if open
  if(document.getElementById('side-menu').classList.contains('open')) updateSideMenuProgress();
};


/* ════════════════════════════════
   SIDE MENU TAB SWITCH
════════════════════════════════ */
function switchSideTab(tab){
  document.querySelectorAll('.side-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.side-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('stab-'+tab)?.classList.add('active');
  document.getElementById('spanel-'+tab)?.classList.add('active');
}

/* ════════════════════════════════
   ACCORDION
════════════════════════════════ */
function toggleAccordion(cat){
  const acc=document.getElementById('acc-'+cat);
  if(!acc) return;
  acc.classList.toggle('open');
}

/* ════════════════════════════════
   LANG PANEL IN SIDE MENU
════════════════════════════════ */
const _setLangOrig=setLang;
setLang=function(lang){
  // Update side panel checks
  ['vi','en','zh','fr'].forEach(l=>{
    document.getElementById('slang-'+l)?.classList.remove('active');
    const chk=document.getElementById('slang-check-'+l);
    if(chk) chk.textContent='';
  });
  document.getElementById('slang-'+lang)?.classList.add('active');
  const chk=document.getElementById('slang-check-'+lang);
  if(chk) chk.textContent='✓';
  // Also update topnav label
  const labels={vi:'VI',en:'EN',zh:'中',fr:'FR'};
  const lbl=document.getElementById('lang-label');
  if(lbl) lbl.textContent=labels[lang]||lang.toUpperCase();
  toast('🌐 Ngôn ngữ: '+lang.toUpperCase()+' (đang phát triển)');
};

/* ════════════════════════════════
   SIDE MENU UPDATE (override)
════════════════════════════════ */
const _toggleSideOrig=toggleSideMenu;
toggleSideMenu=function(){
  document.getElementById('side-menu').classList.toggle('open');
  document.getElementById('side-menu-overlay').classList.toggle('show');
  const u=typeof getCurrentUsername==='function'?getCurrentUsername():null;
  document.getElementById('side-username').textContent=u||'Khách';
  document.getElementById('side-xp').textContent=xp;
  document.getElementById('side-free').textContent=freeLeft>=99?'∞':freeLeft;
  // total plays
  const total=['myth','battle','dynasty'].reduce((s,c)=>s+getPlayedCount(c),0);
  document.getElementById('side-plays').textContent=total;
  updateSideAccordions();
};

function updateSideAccordions(){
  const mythP=getPlayedCount('myth');
  const battleP=getPlayedCount('battle');
  const dynastyP=getPlayedCount('dynasty');
  const battleUnlocked=mythP>=15;
  const dynastyUnlocked=battleP>=15&&mythP>=30;

  // myth bar (cap at 30 for dynasty req)
  const mythPct=Math.min(100,Math.round(mythP/30*100));
  const mf=document.getElementById('myth-fill');
  if(mf) mf.style.width=mythPct+'%';
  const mc=document.getElementById('myth-count');
  if(mc) mc.textContent=mythP+' bàn đã chơi';

  // battle
  const bb=document.getElementById('side-badge-battle');
  const br=document.getElementById('battle-req');
  const bpb=document.getElementById('battle-play-btn');
  const battlePct=Math.min(100,Math.round(battleP/15*100));
  const bf=document.getElementById('battle-fill');
  if(bf) bf.style.width=battlePct+'%';
  const bc=document.getElementById('battle-count');
  if(bc) bc.textContent=battleP+' / 15 bàn';
  if(bb){if(battleUnlocked){bb.textContent='✅ Mở';bb.className='side-unlock-badge unlocked';}
    else{bb.textContent='HT '+mythP+'/15';bb.className='side-unlock-badge';}}
  if(br) br.style.display=battleUnlocked?'none':'block';
  if(bpb){bpb.classList.toggle('locked',!battleUnlocked);}

  // dynasty
  const db=document.getElementById('side-badge-dynasty');
  const dr=document.getElementById('dynasty-req');
  const dpb=document.getElementById('dynasty-play-btn');
  const dynastyPct=Math.min(100,Math.round((battleP/15+mythP/30)/2*100));
  const dyf=document.getElementById('dynasty-fill');
  if(dyf) dyf.style.width=dynastyPct+'%';
  const dyc=document.getElementById('dynasty-count');
  if(dyc) dyc.textContent='CT '+battleP+'/15 · HT '+mythP+'/30';
  if(db){if(dynastyUnlocked){db.textContent='✅ Mở';db.className='side-unlock-badge unlocked';}
    else{db.textContent='CT '+battleP+'/15+HT '+mythP+'/30';db.className='side-unlock-badge';}}
  if(dr) dr.style.display=dynastyUnlocked?'none':'block';
  if(dpb){dpb.classList.toggle('locked',!dynastyUnlocked);}
}

/* ════════════════════════════════
   XP REDEEM
════════════════════════════════ */
function redeemXP(cost){
  if(xp<cost){ toast('❌ Không đủ XP! Cần '+cost+' XP'); return; }
  const rewards={50:3,100:8,200:99};
  const gain=rewards[cost];
  xp-=cost;
  if(gain===99){ freeLeft=99; } else { freeLeft=Math.max(0,freeLeft)+gain; }
  syncHud();
  persistCurrentProfile&&persistCurrentProfile();
  toast('✅ Đổi '+cost+' XP → '+(gain===99?'Không giới hạn 24h':'+'+gain+' lượt chơi'));
  setTimeout(()=>go('map',curCat),800);
}

/* ════════════════════════════════
   UPDATE PAYWALL XP DISPLAY
════════════════════════════════ */
const _goPW=go;
go=function(screen,cat){
  _goPW(screen,cat);
  if(screen==='pay'){
    const d=document.getElementById('pw-xp-display');
    if(d) d.textContent=xp;
    const desc=document.getElementById('pw-desc-text');
    if(desc && freeLeft<=0) desc.innerHTML='Bạn đã dùng hết <strong style="color:var(--gold)">5 lượt miễn phí</strong>.<br>Dùng XP hoặc nâng cấp để tiếp tục!';
  }
};


/* ════════════════════════════════
   QUIZ SYSTEM — Kiểm Tra Kiến Thức
════════════════════════════════ */
let quizEventId = null;
let quizQuestions = [];
let quizAnswers = {};
let quizPassed = false;

function normalizeQuizQuestion(q) {
  const opts = Array.isArray(q.opts)
    ? q.opts
    : (Array.isArray(q.options) ? q.options : (Array.isArray(q.answers) ? q.answers : []));
  return {
    id: q.id,
    q: q.q || q.question || q.text || '',
    opts: opts,
    difficulty: q.difficulty || 'medium'
  };
}

function getQuizErrorMessage(err, fallback) {
  if (!err) return fallback;
  if (typeof err.detail === 'string') return err.detail;
  if (Array.isArray(err.detail)) {
    return err.detail.map(item => item.msg || item.message || 'Lỗi dữ liệu').join('; ');
  }
  return err.error || err.message || fallback;
}

function quizText(value) {
  return escapeHtml(value == null ? '' : value);
}

async function openQuiz(eventId) {
  quizEventId = eventId;
  quizQuestions = [];
  quizAnswers = {};
  const overlay = document.getElementById('quiz-overlay');
  const content = document.getElementById('quiz-content');
  const title = document.getElementById('quiz-title');
  if (!overlay || !content || !title) {
    toast('Không tìm thấy giao diện quiz.');
    return;
  }
  const ev = EVS[eventId];
  title.textContent = '📝 ' + (ev ? ev.title : 'Kiểm Tra Kiến Thức');
  content.innerHTML = '<div class="quiz-loading"><div class="spinner"></div>Đang tải câu hỏi...</div>';
  overlay.classList.add('open');

  try {
    const token = localStorage.getItem('token');
    const headers = token ? { 'Authorization': 'Bearer ' + token } : {};
    const res = await fetch('/api/quiz/' + eventId, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(getQuizErrorMessage(err, 'Lỗi tải câu hỏi'));
    }
    const data = await res.json();
    const rawQuestions = Array.isArray(data.questions) ? data.questions : (Array.isArray(data) ? data : []);
    quizQuestions = rawQuestions
      .map(normalizeQuizQuestion)
      .filter(q => q.id !== undefined && q.q && Array.isArray(q.opts) && q.opts.length);
    if (quizQuestions.length === 0) {
      content.innerHTML = '<div class="quiz-loading">Chưa có câu hỏi cho sự kiện này.</div>';
      return;
    }
    renderQuizQuestions();
  } catch (e) {
    content.innerHTML = '<div class="quiz-loading">⚠️ ' + e.message + '</div>';
  }
}

function renderQuizQuestions() {
  const content = document.getElementById('quiz-content');
  if (!content) return;
  const total = quizQuestions.length;
  // Kahoot-style progress bar với label
  let html = '<div class="quiz-progress">';
  quizQuestions.forEach((q, i) => {
    html += '<div class="quiz-progress-dot" id="quiz-dot-' + i + '"></div>';
  });
  html += '<span class="quiz-progress-label">0/' + total + '</span>';
  html += '</div>';
  html += '<div class="quiz-body">';
  quizQuestions.forEach((q, i) => {
    const diffClass = q.difficulty === 'easy' ? 'easy' : q.difficulty === 'hard' ? 'hard' : 'medium';
    const diffLabel = q.difficulty === 'easy' ? 'Dễ' : q.difficulty === 'hard' ? 'Khó' : 'Trung bình';
    html += '<div class="quiz-q" id="quiz-q-' + i + '">';
    html += '<div class="quiz-q-num">Câu ' + (i + 1) + '/' + total + ' <span class="quiz-q-diff ' + diffClass + '">' + diffLabel + '</span></div>';
    html += '<div class="quiz-q-text">' + quizText(q.q) + '</div>';
    html += '<div class="quiz-opts">';
    const opts = Array.isArray(q.opts) ? q.opts : [];
    opts.forEach((opt, j) => {
      // data-oi gắn vào để CSS Kahoot colors hoạt động
      html += '<div class="quiz-opt" data-qi="' + i + '" data-oi="' + j + '" onclick="selectQuizOpt(this,' + i + ',' + j + ')">';
      html += '<span class="quiz-opt-letter">' + String.fromCharCode(65 + j) + '</span>';
      html += '<span>' + quizText(opt) + '</span></div>';
    });
    html += '</div></div>';
  });
  html += '</div>';
  html += '<div class="quiz-footer"><button class="quiz-submit" id="quiz-submit-btn" onclick="submitQuiz()" disabled>Nộp Bài (' + total + ' câu)</button></div>';
  content.innerHTML = html;
  // Đánh dấu câu đầu tiên là "current"
  const firstDot = document.getElementById('quiz-dot-0');
  if (firstDot) firstDot.classList.add('current');
}

function selectQuizOpt(el, qi, oi) {
  const qDiv = document.getElementById('quiz-q-' + qi);
  if (!qDiv || !el) return;
  qDiv.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  quizAnswers[qi] = oi;
  // Update progress bar: đánh dấu done và chuyển current sang câu tiếp theo
  const dot = document.getElementById('quiz-dot-' + qi);
  if (dot) { dot.classList.remove('current'); dot.classList.add('done'); }
  const nextDot = document.getElementById('quiz-dot-' + (qi + 1));
  if (nextDot && !nextDot.classList.contains('done')) nextDot.classList.add('current');
  // Cập nhật label đếm
  const answered = Object.keys(quizAnswers).length;
  const labelEl = document.querySelector('.quiz-progress-label');
  if (labelEl) labelEl.textContent = answered + '/' + quizQuestions.length;
  const btn = document.getElementById('quiz-submit-btn');
  if (btn) btn.disabled = answered < quizQuestions.length;
}

async function submitQuiz() {
  const btn = document.getElementById('quiz-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Đang chấm...'; }

  const answers = quizQuestions.map((q, i) => ({
    question_id: q.id,
    selected: quizAnswers[i] !== undefined ? quizAnswers[i] : -1
  }));

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/quiz/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
      },
      body: JSON.stringify({ event_id: quizEventId, answers: answers })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(getQuizErrorMessage(data, 'Lỗi khi chấm bài'));
    showQuizResults(data);
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Nộp Bài'; }
    toast('⚠️ ' + e.message);
  }
}

function showQuizResults(data) {
  const results = Array.isArray(data.results) ? data.results : [];
  // Highlight correct/wrong answers
  quizQuestions.forEach((q, i) => {
    const qDiv = document.getElementById('quiz-q-' + i);
    if (!qDiv) return;
    const opts = qDiv.querySelectorAll('.quiz-opt');
    opts.forEach(o => o.classList.add('disabled'));
    const result = results[i];
    if (result) {
      opts.forEach((o, j) => {
        if (j === result.correct_ans) o.classList.add('correct');
        if (j === result.selected && !result.is_correct) o.classList.add('wrong');
      });
    }
  });

  // Update progress dots
  const dots = document.querySelectorAll('.quiz-progress-dot');
  results.forEach((r, i) => {
    if (dots[i]) {
      dots[i].classList.remove('current');
      if (r.is_correct) dots[i].classList.add('done');
      else dots[i].style.background = '#e53935';
    }
  });

  // Show result summary
  const content = document.getElementById('quiz-content');
  const icon = data.passed ? '🎉' : '😔';
  const cls = data.passed ? 'pass' : 'fail';
  const msg = data.passed
    ? 'Xuất sắc! Bạn đã vượt qua!'
    : 'Chưa đạt! Cần trả lời đúng ít nhất 2/3 câu.';

  const ev = EVS[quizEventId];
  const historyNote = ev ? ev.explain || ev.story.substring(0, 120) + '...' : '';

  let resultHtml = '<div class="quiz-result">';
  resultHtml += '<div class="quiz-result-icon">' + icon + '</div>';
  resultHtml += '<div class="quiz-result-title ' + cls + '">' + msg + '</div>';
  resultHtml += '<div class="quiz-result-score">Điểm: ' + data.score + '/' + data.total + '</div>';
  if (historyNote) {
    resultHtml += '<div class="quiz-result-msg">📜 ' + historyNote + '</div>';
  }
  if (data.passed) {
    resultHtml += '<button class="quiz-result-btn primary" onclick="closeQuiz();nextEv()">Tiếp Theo →</button>';
  } else {
    resultHtml += '<button class="quiz-result-btn primary" onclick="openQuiz(\'' + quizEventId + '\')">🔄 Thử Lại</button>';
  }
  resultHtml += '<button class="quiz-result-btn secondary" onclick="closeQuiz()">Đóng</button>';
  resultHtml += '</div>';

  // Append result after the footer
  const footer = content.querySelector('.quiz-footer');
  if (footer) footer.outerHTML = resultHtml;
  else content.insertAdjacentHTML('beforeend', resultHtml);

  // Scroll quiz box to show results
  const quizBox = document.querySelector('.quiz-box');
  if (quizBox) setTimeout(() => quizBox.scrollTo({ top: quizBox.scrollHeight, behavior: 'smooth' }), 100);

  // Bonus XP for passing
  if (data.passed) {
    quizPassed = true;
    const bonus = 15;
    awardXp(bonus, { type:'quiz', title:'Quiz: ' + (EVS[quizEventId] ? EVS[quizEventId].title : quizEventId), details:'Đạt ' + data.score + '/' + data.total + ' câu đúng.', eventId:quizEventId, category:curCat, year:EVS[quizEventId] ? EVS[quizEventId].yr : '' });
    toast('🏆 +' + bonus + ' XP thưởng quiz!');
  }
}

function closeQuiz() {
  document.getElementById('quiz-overlay').classList.remove('open');
}

/* ════════════════════════════════
   CHATBOT LỊCH SỬ — AI (Gemini)
════════════════════════════════ */
function toggleChatbot(){
  document.getElementById('chatbot-modal').classList.toggle('open');
  if(document.getElementById('chatbot-modal').classList.contains('open')){
    document.getElementById('chatbot-input').focus();
  }
}

/* Fallback KB when API is unavailable */
const HISTORY_KB={
  'lạc long quân':'Lạc Long Quân là con trai của Thần Biển, thuộc dòng dõi Rồng. Ông kết hôn với Âu Cơ (tiên nữ) và sinh ra bọc trăm trứng — tổ tiên của người Việt.',
  'âu cơ':'Âu Cơ là tiên nữ trên núi, vợ của Lạc Long Quân. Bà sinh ra bọc trăm trứng, 50 con theo cha xuống biển, 50 con theo mẹ lên núi.',
  'hùng vương':'18 đời Hùng Vương cai trị nhà nước Văn Lang từ khoảng thế kỷ 7 TCN, kinh đô Phong Châu (Phú Thọ).',
  'hai bà trưng':'Trưng Trắc và Trưng Nhị khởi nghĩa năm 40 SCN chống ách đô hộ Đông Hán, thu phục hơn 65 thành trì.',
  'bạch đằng':'Trận Bạch Đằng năm 938 do Ngô Quyền chỉ huy — dùng cọc gỗ bọc sắt cắm xuống lòng sông kết hợp thủy triều, chấm dứt hơn 1000 năm Bắc thuộc.',
  'trần hưng đạo':'Trần Hưng Đạo (1228–1300) chỉ huy 3 cuộc kháng chiến chống Mông-Nguyên thắng lợi. Tác phẩm "Hịch tướng sĩ" là áng văn bất hủ.',
  'lê lợi':'Lê Lợi khởi nghĩa Lam Sơn năm 1418, đánh đuổi quân Minh sau 10 năm. Nguyễn Trãi soạn Bình Ngô Đại Cáo.',
  'an dương vương':'An Dương Vương xây thành Cổ Loa nhờ Thần Rùa Kim Quy. Có nỏ thần bắn một phát giết nghìn quân.',
};

function escapeChat(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

/* Simple markdown: **bold**, *italic*, - list items, newlines */
function renderMd(s){
  return escapeChat(s)
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/^[-•]\s+(.+)/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs,'<ul>$1</ul>')
    .replace(/\n/g,'<br>');
}

function fallbackAnswer(q){
  q=q.toLowerCase().normalize('NFC');
  for(const [key,ans] of Object.entries(HISTORY_KB)){
    if(q.includes(key)) return ans;
  }
  return 'Hiện tại AI không khả dụng. Hãy thử hỏi về: Hai Bà Trưng, Ngô Quyền, Trần Hưng Đạo, Lê Lợi...';
}

let _chatBusy=false;
async function sendChat(){
  if(_chatBusy) return;
  const inp=document.getElementById('chatbot-input');
  const q=inp.value.trim();
  if(!q) return;
  inp.value='';
  const msgs=document.getElementById('chatbot-msgs');
  msgs.innerHTML+=`<div class="chat-msg user"><div class="chat-bubble">${escapeChat(q)}</div></div>`;
  const typingId='typing_'+Date.now();
  msgs.innerHTML+=`<div class="chat-msg bot" id="${typingId}"><div class="chat-bubble"><div class="chat-typing"><div class="chat-dot"></div><div class="chat-dot"></div><div class="chat-dot"></div></div></div></div>`;
  msgs.scrollTop=msgs.scrollHeight;
  _chatBusy=true;
  let reply=null;
  for(let attempt=0;attempt<2;attempt++){
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q})});
      if(res.ok){
        const data=await res.json();
        reply=data.reply;
        break;
      }
      if(res.status===429){ await new Promise(r=>setTimeout(r,2000)); continue; }
      break;
    }catch(e){ /* network error, retry */ }
  }
  const typing=document.getElementById(typingId);
  if(typing) typing.remove();
  if(reply){
    msgs.innerHTML+=`<div class="chat-msg bot"><div class="chat-bubble">${renderMd(reply)}</div></div>`;
  } else {
    const ans=fallbackAnswer(q);
    msgs.innerHTML+=`<div class="chat-msg bot"><div class="chat-bubble">${escapeChat(ans)}</div></div>`;
  }
  _chatBusy=false;
  msgs.scrollTop=msgs.scrollHeight;
}


/* ════════════════════════════════
   PATH MAP SCROLL (arrow buttons)
════════════════════════════════ */
let _pathOffset=0;
let _pathMaxOffset=0;
const PATH_SCROLL_STEP=3; // nodes per click

function scrollPath(dir){
  const canvas=document.getElementById('path-canvas');
  const vp=document.getElementById('path-viewport');
  if(!canvas||!vp) return;
  const vpW=vp.offsetWidth;
  const cvW=canvas.offsetWidth;
  _pathMaxOffset=Math.max(0,cvW-vpW);
  const step=vpW*0.7;
  _pathOffset=Math.max(0,Math.min(_pathMaxOffset,_pathOffset+dir*step));
  canvas.style.transform=`translateX(${-_pathOffset}px)`;
  _updatePathArrows();
}
function _updatePathArrows(){
  const l=document.getElementById('parr-l');
  const r=document.getElementById('parr-r');
  const canvas=document.getElementById('path-canvas');
  const vp=document.getElementById('path-viewport');
  if(!l||!r||!canvas||!vp) return;
  _pathMaxOffset=Math.max(0,canvas.offsetWidth-vp.offsetWidth);
  l.disabled=(_pathOffset<=0);
  r.disabled=(_pathOffset>=_pathMaxOffset-2);
}
function _resetPathScroll(){
  _pathOffset=0;
  const canvas=document.getElementById('path-canvas');
  if(canvas) canvas.style.transform='translateX(0)';
  setTimeout(_updatePathArrows,100);
}

setupJournalBindings();
initializeAuthUI();
_applyPathRoute(false); // parse URL before checkAuth so _pendingRoute is ready
setTimeout(function(){
  _installRouteAuthHooks();
  _checkAuthThenApplyRoute();
}, 150);
setTimeout(function(){ _installRouteAuthHooks(); _runPendingRouteIfReady(); }, 450);
setTimeout(function(){ _installRouteAuthHooks(); _runPendingRouteIfReady(); }, 900);

// ── Explicit window exports (ensure inline onclick handlers work) ──
window.go = go;
window._applyPathRoute = _applyPathRoute;
window._pushRoute = _pushRoute;
window.showIntro = typeof showIntro !== 'undefined' ? showIntro : window.showIntro;
window.hideIntro = typeof hideIntro !== 'undefined' ? hideIntro : window.hideIntro;
window.toggleSideMenu = toggleSideMenu;
window.closeSideMenu = closeSideMenu;
window.showSearchModal = showSearchModal;
window.hideSearchModal = hideSearchModal;
window.runHistorySearch = runHistorySearch;
window.switchAuth = switchAuth;
window.selectCat = selectCat;
window.openEv = openEv;
window.syncHud = syncHud;
window.toast = toast;
window.buy = buy;
window.closeVid = closeVid;
window.pickChoice = pickChoice;
window._playMythBranchVid = _playMythBranchVid;
window._retryMythChoice = _retryMythChoice;
window.confirmPayment = confirmPayment;
window.activatePlan = activatePlan;
window.showAuthScreen = showAuthScreen;
window.hideAuthScreen = hideAuthScreen;
window.toggleLangMenu = toggleLangMenu;
window.setLang = setLang;
window.switchJournalTab = switchJournalTab;
window.pathPage = pathPage;
window.scrollPath = scrollPath;
window.toggleAccordion = toggleAccordion;
window.switchSideTab = switchSideTab;
window.formatCard = formatCard;
window.formatExp = formatExp;
