"""
Generate seed quiz bank with hardcoded high-quality questions.
20 questions per event = 1000+ total questions.
Can be expanded later via AI.
"""
import json

bank = {}

# ============================================================
# MYTH EVENTS
# ============================================================

bank["laclong"] = [
  {"id":1,"q":"Lạc Long Quân là con trai của ai?","opts":["Ngọc Hoàng","Thần Biển (Kinh Dương Vương)","Sơn Tinh","Thủy Tinh"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Âu Cơ thuộc dòng dõi nào?","opts":["Tiên nữ trên núi","Thần biển","Công chúa nhà Thương","Nữ thần sông Hồng"],"ans":0,"difficulty":"easy"},
  {"id":3,"q":"Lạc Long Quân và Âu Cơ sinh ra bao nhiêu người con?","opts":["50","88","100","1000"],"ans":2,"difficulty":"easy"},
  {"id":4,"q":"Bọc trứng của Âu Cơ nở ra thành gì?","opts":["100 con rồng","100 người con","50 chim phượng","12 vị thần"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Sau khi chia con, 50 người theo cha đi đâu?","opts":["Lên núi","Xuống biển","Ra đảo","Sang phương Bắc"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"50 người con theo mẹ Âu Cơ đi đâu?","opts":["Xuống biển","Lên núi","Ra đồng bằng","Sang Lào"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Người con cả lên làm vua lấy hiệu là gì?","opts":["An Dương Vương","Hùng Vương","Lạc Vương","Đinh Vương"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Nhà nước đầu tiên được lập từ truyền thuyết này tên gì?","opts":["Đại Việt","Âu Lạc","Văn Lang","Đại Cồ Việt"],"ans":2,"difficulty":"medium"},
  {"id":9,"q":"Kinh đô Văn Lang đặt ở đâu?","opts":["Cổ Loa","Phong Châu","Thăng Long","Hoa Lư"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Truyền thuyết Lạc Long Quân giải thích điều gì?","opts":["Nguồn gốc dân tộc Việt","Lịch sử chiến tranh","Tín ngưỡng thờ thần","Phong tục Tết"],"ans":0,"difficulty":"easy"},
  {"id":11,"q":"Người Việt tự nhận là gì dựa trên truyền thuyết này?","opts":["Con Rồng cháu Tiên","Con cháu Ngọc Hoàng","Hậu duệ Thần Nông","Dòng dõi Phục Hy"],"ans":0,"difficulty":"easy"},
  {"id":12,"q":"Lạc Long Quân có khả năng đặc biệt gì?","opts":["Bay trên trời","Sống dưới nước","Biến hình","Nhìn thấu tương lai"],"ans":1,"difficulty":"medium"},
  {"id":13,"q":"Âu Cơ gặp Lạc Long Quân ở đâu?","opts":["Trên núi cao","Dưới biển sâu","Vùng đồng bằng","Trong rừng sâu"],"ans":2,"difficulty":"hard"},
  {"id":14,"q":"Tại sao Lạc Long Quân và Âu Cơ phải chia con?","opts":["Vì chiến tranh","Vì tính tình khác nhau, giống khác nhau","Vì Ngọc Hoàng ra lệnh","Vì con cái quá đông"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Truyền thuyết này thuộc thời kỳ nào?","opts":["Thời kỳ Bắc thuộc","Thời Sáng Thế","Thời nhà Trần","Thời Pháp thuộc"],"ans":1,"difficulty":"easy"},
  {"id":16,"q":"Phong Châu ngày nay thuộc tỉnh nào?","opts":["Phú Thọ","Tuyên Quang","Vĩnh Phúc","Hà Nội"],"ans":0,"difficulty":"hard"},
  {"id":17,"q":"Lạc Long Quân dạy dân làm gì?","opts":["Đúc đồng","Trồng lúa, đánh cá","Xây thành","Buôn bán"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Trong truyền thuyết, Rồng tượng trưng cho gì?","opts":["Sức mạnh biển cả","Quyền lực hoàng gia","Trí tuệ","Chiến tranh"],"ans":0,"difficulty":"medium"},
  {"id":19,"q":"Tiên trong truyền thuyết tượng trưng cho gì?","opts":["Núi rừng, vẻ đẹp","Chiến tranh","Mưa gió","Biển cả"],"ans":0,"difficulty":"medium"},
  {"id":20,"q":"Bao nhiêu đời vua Hùng trị vì Văn Lang?","opts":["10","15","18","20"],"ans":2,"difficulty":"easy"},
]

bank["autien"] = [
  {"id":1,"q":"Ai là người dâng Bánh Chưng Bánh Dày?","opts":["Lang Liêu","Lang Tiều","Sơn Tinh","Hùng Duệ Vương"],"ans":0,"difficulty":"easy"},
  {"id":2,"q":"Bánh Chưng hình gì?","opts":["Tròn","Vuông","Tam giác","Bầu dục"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Bánh Dày hình gì?","opts":["Vuông","Tròn","Tam giác","Chữ nhật"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Bánh Chưng tượng trưng cho gì?","opts":["Trời","Đất","Nước","Lửa"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Bánh Dày tượng trưng cho gì?","opts":["Đất","Trời","Nước","Rừng"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Vua Hùng thứ mấy ra đề thi?","opts":["Thứ 3","Thứ 6","Thứ 10","Thứ 18"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Lang Liêu là hoàng tử có đặc điểm gì?","opts":["Giỏi võ","Nghèo nhất","Thông minh nhất","Khoẻ nhất"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Ai hiện ra trong giấc mơ giúp Lang Liêu?","opts":["Ngọc Hoàng","Thần linh (Bụt)","Lạc Long Quân","Rùa Vàng"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Nguyên liệu chính làm Bánh Chưng là gì?","opts":["Bột mì","Gạo nếp, đậu xanh, thịt lợn","Bột gạo, đường","Ngô, khoai"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Thi dâng lễ vật diễn ra vào dịp nào?","opts":["Trung Thu","Tết Nguyên Đán","Giỗ Tổ","Lễ hội mùa xuân"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Các hoàng tử khác dâng gì?","opts":["Sơn hào hải vị","Vàng bạc","Ngọc quý","Binh khí"],"ans":0,"difficulty":"easy"},
  {"id":12,"q":"Vua Hùng truyền ngôi cho ai?","opts":["Hoàng tử cả","Lang Liêu","Hoàng tử út","Sơn Tinh"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Lý do Bánh Chưng được chọn là gì?","opts":["Vì đẹp nhất","Vì dùng nguyên liệu quý","Vì tượng trưng cho trời đất, lòng hiếu thảo","Vì ngon nhất"],"ans":2,"difficulty":"medium"},
  {"id":14,"q":"Truyện Bánh Chưng Bánh Dày ca ngợi phẩm chất gì?","opts":["Lòng dũng cảm","Lòng hiếu thảo, sáng tạo","Sức mạnh","Giàu có"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Bánh Chưng được gói bằng lá gì?","opts":["Lá chuối","Lá dong","Lá sen","Lá tre"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Phong tục gói Bánh Chưng vào dịp nào?","opts":["Tết Nguyên Đán","Trung Thu","Giỗ Tổ Hùng Vương","Tết Hàn thực"],"ans":0,"difficulty":"easy"},
  {"id":17,"q":"Bánh Chưng có nhân gì?","opts":["Đậu đỏ","Đậu xanh và thịt lợn","Tôm khô","Mè đen"],"ans":1,"difficulty":"easy"},
  {"id":18,"q":"Truyền thuyết này giải thích nguồn gốc phong tục gì?","opts":["Tục thờ cúng","Tục gói Bánh Chưng ngày Tết","Tục cưới hỏi","Tục đốt pháo"],"ans":1,"difficulty":"easy"},
  {"id":19,"q":"Lang Liêu nghèo vì lý do gì?","opts":["Bị vua cha ghét","Mẹ mất sớm, không được nuôi dưỡng","Bị anh em tranh giành","Không chịu làm ăn"],"ans":1,"difficulty":"hard"},
  {"id":20,"q":"Câu chuyện này thuộc đời Hùng Vương thứ mấy?","opts":["Thứ nhất","Thứ sáu","Thứ mười","Thứ mười tám"],"ans":1,"difficulty":"medium"},
]

bank["sontinhts"] = [
  {"id":1,"q":"Sơn Tinh là thần gì?","opts":["Thần Nước","Thần Núi","Thần Gió","Thần Lửa"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Thủy Tinh là thần gì?","opts":["Thần Núi","Thần Nước","Thần Mưa","Thần Sấm"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Công chúa Mị Nương là con gái vua nào?","opts":["Hùng Vương thứ 6","Hùng Vương thứ 18","An Dương Vương","Đinh Tiên Hoàng"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Ai đến cầu hôn Mị Nương trước?","opts":["Thủy Tinh","Sơn Tinh","Cả hai cùng lúc","Không ai trước"],"ans":2,"difficulty":"medium"},
  {"id":5,"q":"Vua Hùng chọn ai làm rể?","opts":["Thủy Tinh","Sơn Tinh","Không chọn ai","Cả hai"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Tại sao Sơn Tinh được chọn?","opts":["Đẹp trai hơn","Mang lễ vật đến trước","Mạnh hơn","Giàu hơn"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Thủy Tinh trả thù bằng cách nào?","opts":["Gây chiến tranh","Dâng nước lũ hàng năm","Bắt cóc Mị Nương","Giết Sơn Tinh"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Sơn Tinh chống lũ bằng cách nào?","opts":["Xây đê","Nâng núi lên cao hơn nước","Dùng phép thuật đóng băng","Đào kênh thoát nước"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Truyện giải thích hiện tượng thiên nhiên gì?","opts":["Động đất","Lũ lụt hàng năm","Núi lửa phun","Hạn hán"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Kết quả cuộc chiến Sơn Tinh - Thủy Tinh?","opts":["Thủy Tinh thắng","Sơn Tinh luôn thắng","Hòa","Không ai thắng"],"ans":1,"difficulty":"easy"},
  {"id":11,"q":"Lễ vật mà vua Hùng yêu cầu gồm những gì?","opts":["Vàng bạc","Voi chín ngà, gà chín cựa, ngựa chín hồng mao","Trâu 100 con","Lụa 1000 xấp"],"ans":1,"difficulty":"medium"},
  {"id":12,"q":"Cuộc chiến Sơn Tinh - Thủy Tinh phản ánh gì?","opts":["Chiến tranh giữa các bộ tộc","Cuộc đấu tranh con người với thiên nhiên","Tranh giành quyền lực","Mâu thuẫn gia đình"],"ans":1,"difficulty":"medium"},
  {"id":13,"q":"Sơn Tinh sống ở đâu?","opts":["Biển Đông","Núi Tản Viên (Ba Vì)","Hồ Hoàn Kiếm","Sông Hồng"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Cuộc chiến xảy ra bao lâu?","opts":["1 năm","10 năm","Mãi mãi, hàng năm","100 năm"],"ans":2,"difficulty":"easy"},
  {"id":15,"q":"Thủy Tinh thua nhưng vẫn làm gì?","opts":["Đầu hàng","Mỗi năm vẫn dâng nước trả thù","Bỏ đi nơi khác","Cầu hòa"],"ans":1,"difficulty":"easy"},
  {"id":16,"q":"Núi Tản Viên ngày nay ở đâu?","opts":["Ba Vì, Hà Nội","Sapa, Lào Cai","Tam Đảo, Vĩnh Phúc","Yên Tử, Quảng Ninh"],"ans":0,"difficulty":"hard"},
  {"id":17,"q":"Truyện Sơn Tinh Thủy Tinh thuộc thời kỳ nào?","opts":["Thời Bắc thuộc","Đời Hùng Vương","Thời nhà Lý","Thời nhà Trần"],"ans":1,"difficulty":"easy"},
  {"id":18,"q":"Sơn Tinh có phép thuật gì?","opts":["Gọi gió bão","Vẫy tay nâng núi, dời đồi","Hóa thành rồng","Biến đá thành vàng"],"ans":1,"difficulty":"medium"},
  {"id":19,"q":"Mị Nương cuối cùng theo ai?","opts":["Thủy Tinh","Sơn Tinh","Trở về cung","Bỏ đi"],"ans":1,"difficulty":"easy"},
  {"id":20,"q":"Người Việt xây gì để chống lũ lụt?","opts":["Thành trì","Đê điều","Cầu","Đập nước"],"ans":1,"difficulty":"medium"},
]

bank["andvuong"] = [
  {"id":1,"q":"An Dương Vương lập nước gì?","opts":["Văn Lang","Âu Lạc","Nam Việt","Đại Cồ Việt"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Thành Cổ Loa có hình gì?","opts":["Hình vuông","Hình tròn","Hình xoáy ốc","Hình tam giác"],"ans":2,"difficulty":"easy"},
  {"id":3,"q":"Ai tặng An Dương Vương nỏ thần?","opts":["Lạc Long Quân","Thần Rùa Kim Quy","Ngọc Hoàng","Sơn Tinh"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Nỏ thần có khả năng gì?","opts":["Bay trên trời","Bắn một phát giết nghìn quân","Tàng hình","Chữa bệnh"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Triệu Đà dùng kế gì để thôn tính Âu Lạc?","opts":["Tấn công quân sự trực tiếp","Kế hôn nhân (gửi Trọng Thủy cầu hôn)","Hối lộ quan lại","Phong tỏa kinh tế"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Trọng Thủy là ai?","opts":["Tướng của An Dương Vương","Con trai Triệu Đà","Quan cận thần","Thần thoại"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Mị Châu là ai?","opts":["Vợ Triệu Đà","Con gái An Dương Vương","Nữ tướng","Công chúa nhà Lý"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Thành Cổ Loa có bao nhiêu vòng thành?","opts":["2","3","5","7"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"An Dương Vương xây thành năm nào?","opts":["2879 TCN","500 TCN","257 TCN","179 TCN"],"ans":2,"difficulty":"medium"},
  {"id":10,"q":"Âu Lạc bị Triệu Đà thôn tính năm nào?","opts":["257 TCN","207 TCN","179 TCN","111 TCN"],"ans":2,"difficulty":"medium"},
  {"id":11,"q":"Thành Cổ Loa ngày nay thuộc địa phương nào?","opts":["Đông Anh, Hà Nội","Ninh Bình","Phú Thọ","Thanh Hóa"],"ans":0,"difficulty":"hard"},
  {"id":12,"q":"Lẫy nỏ thần được làm từ gì?","opts":["Sắt","Vuốt (móng) rùa thần","Ngọc","Đồng"],"ans":1,"difficulty":"medium"},
  {"id":13,"q":"Tại sao thành hình ốc khó bị tấn công?","opts":["Vì cao","Không có góc yếu","Vì rộng","Vì có hào nước"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Trọng Thủy đánh cắp gì?","opts":["Vàng bạc","Lẫy nỏ thần","Bản đồ quân sự","Binh khí"],"ans":1,"difficulty":"easy"},
  {"id":15,"q":"An Dương Vương thuộc dòng họ nào?","opts":["Họ Hùng","Họ Thục","Họ Triệu","Họ Ngô"],"ans":1,"difficulty":"hard"},
  {"id":16,"q":"Khi thua trận, An Dương Vương chạy đến đâu?","opts":["Lên núi","Ra biển, Rùa Vàng hiện lên","Sang Trung Quốc","Vào rừng sâu"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Rùa Vàng nói gì với An Dương Vương?","opts":["Hãy đánh tiếp","Kẻ thù ngồi sau lưng nhà vua","Hãy chạy về phương Bắc","Hãy cầu cứu thần linh"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Bài học lịch sử từ An Dương Vương là gì?","opts":["Phải có quân đội mạnh","Cảnh giác trong ngoại giao","Phải xây nhiều thành","Phải liên minh"],"ans":1,"difficulty":"medium"},
  {"id":19,"q":"Nước Âu Lạc bao gồm vùng nào?","opts":["Chỉ miền Bắc","Âu Việt và Lạc Việt","Chỉ miền Trung","Toàn Đông Nam Á"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Sau khi Âu Lạc mất, thời kỳ gì bắt đầu?","opts":["Thời kỳ Văn Lang","Thời kỳ Bắc thuộc","Thời nhà Đinh","Thời nhà Lý"],"ans":1,"difficulty":"medium"},
]

bank["m_trongthu"] = [
  {"id":1,"q":"Trọng Thủy là con trai của ai?","opts":["An Dương Vương","Triệu Đà","Ngô Quyền","Lạc Long Quân"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Mị Châu rắc gì dọc đường khi chạy trốn?","opts":["Gạo","Lông ngỗng","Hoa","Vàng"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Mục đích thật sự của Trọng Thủy khi cầu hôn là gì?","opts":["Yêu Mị Châu","Đánh cắp bí mật nỏ thần","Du lịch","Làm gián điệp ngoại giao"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Bi kịch Mị Châu - Trọng Thủy xảy ra năm nào?","opts":["257 TCN","207 TCN","179 TCN","111 TCN"],"ans":2,"difficulty":"medium"},
  {"id":5,"q":"Mị Châu sau khi chết hóa thành gì?","opts":["Ngọc trai","Hoa sen","Con chim","Tảng đá"],"ans":0,"difficulty":"medium"},
  {"id":6,"q":"Trọng Thủy sau khi Mị Châu chết đã làm gì?","opts":["Trở về nước","Nhảy xuống giếng Cổ Loa chết theo","Lên ngôi vua","Bỏ trốn"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Máu Mị Châu rơi xuống biển hóa thành gì?","opts":["San hô","Ngọc trai","Cá voi","Rong biển"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Nước giếng Cổ Loa dùng rửa ngọc trai sẽ thế nào?","opts":["Ngọc mờ đi","Ngọc sáng bóng hơn","Ngọc tan chảy","Không có gì"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Bài học từ câu chuyện Mị Châu là gì?","opts":["Phải tin tưởng chồng","Cảnh giác, không ngây thơ trước kẻ thù","Tình yêu chiến thắng tất cả","Phải giàu có"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Giếng ngọc nằm ở đâu?","opts":["Đền Hùng","Thành Cổ Loa","Hồ Hoàn Kiếm","Chùa Một Cột"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Trọng Thủy yêu Mị Châu thật hay giả?","opts":["Hoàn toàn giả","Ban đầu giả, sau yêu thật","Hoàn toàn thật","Không rõ"],"ans":1,"difficulty":"hard"},
  {"id":12,"q":"Mị Châu vô tình hay cố ý rắc lông ngỗng?","opts":["Cố ý giúp Trọng Thủy","Vô tình, tin chồng","Bị buộc phải làm","Không ai biết"],"ans":1,"difficulty":"medium"},
  {"id":13,"q":"Câu chuyện phản ánh cuộc xung đột giữa ai và ai?","opts":["Nhà Trần và Mông Cổ","Âu Lạc và Nam Việt","Văn Lang và Âu Lạc","Nhà Lý và nhà Tống"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Mị Châu bị cha chém vì tội gì?","opts":["Phản quốc","Để lộ bí mật nỏ thần cho giặc","Bỏ trốn","Không vâng lời"],"ans":1,"difficulty":"easy"},
  {"id":15,"q":"Trọng Thủy thay lẫy nỏ thần bằng gì?","opts":["Lẫy giả","Lẫy đồng","Không thay, chỉ lấy cắp","Lẫy gỗ"],"ans":0,"difficulty":"medium"},
  {"id":16,"q":"An Dương Vương phát hiện ra sự phản bội khi nào?","opts":["Trước trận đánh","Khi nỏ thần không bắn được","Sau khi thắng trận","Khi Rùa Vàng báo"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Rùa Vàng bảo An Dương Vương làm gì với Mị Châu?","opts":["Tha cho nàng","Kẻ thù ngồi sau lưng","Đưa nàng về cung","Để nàng tự quyết định"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Thành Cổ Loa thất thủ vì nguyên nhân chính nào?","opts":["Quân ít","Mất nỏ thần","Tường thành yếu","Thiếu lương thực"],"ans":1,"difficulty":"easy"},
  {"id":19,"q":"Sau khi Cổ Loa thất thủ, ai cai trị?","opts":["Nhà Hán","Triệu Đà","Ngô Quyền","Đinh Bộ Lĩnh"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Câu chuyện Mị Châu Trọng Thủy được coi là gì?","opts":["Thần thoại sáng thế","Bi kịch tình yêu nổi tiếng nhất sử Việt","Truyện cổ tích","Sử ca"],"ans":1,"difficulty":"easy"},
]

bank["m_chunong"] = [
  {"id":1,"q":"Chử Đồng Tử là nhân vật thuộc Tứ Bất Tử nào?","opts":["Thần Nông","Tứ Bất Tử thứ ba","Tứ Bất Tử thứ tư","Không thuộc Tứ Bất Tử"],"ans":1,"difficulty":"medium"},
  {"id":2,"q":"Tiên Dung là ai?","opts":["Nữ thần","Công chúa con vua Hùng","Tiên nữ trên trời","Bà Triệu"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Chử Đồng Tử nghèo đến mức nào?","opts":["Không có nhà","Cha con chỉ có một chiếc khố","Không có đất","Phải đi ăn xin"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Chử Đồng Tử gặp Tiên Dung ở đâu?","opts":["Trên núi","Bãi cát bên sông","Trong cung điện","Trong rừng"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Sau khi cưới, Chử Đồng Tử và Tiên Dung làm gì?","opts":["Về cung","Đi buôn bán, học phép tiên","Lên núi tu hành","Chiến đấu"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Cuối cùng, Chử Đồng Tử và Tiên Dung trở thành gì?","opts":["Vua và hoàng hậu","Thần tiên, bay về trời","Tướng quân","Thầy tu"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Tứ Bất Tử của Việt Nam gồm những ai?","opts":["Tản Viên, Gióng, Chử Đồng Tử, Liễu Hạnh","Sơn Tinh, Thủy Tinh, Ngọc Hoàng, Táo Quân","Lạc Long Quân, Âu Cơ, Hùng Vương, Bà Triệu","An Dương Vương, Triệu Đà, Ngô Quyền, Đinh Bộ Lĩnh"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Chử Đồng Tử vùi mình trong cát vì sao?","opts":["Trốn giặc","Không có quần áo khi Tiên Dung tắm","Chơi trốn tìm","Ngủ"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Vua Hùng phản ứng thế nào khi biết Tiên Dung cưới người nghèo?","opts":["Vui mừng","Tức giận, từ mặt","Không quan tâm","Ban thưởng"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Truyện ca ngợi phẩm chất gì?","opts":["Sức mạnh","Tình yêu vượt qua đẳng cấp xã hội","Lòng dũng cảm","Trí tuệ"],"ans":1,"difficulty":"easy"},
  {"id":11,"q":"Chử Đồng Tử sống ở vùng nào?","opts":["Vùng sông Hồng","Vùng núi","Vùng biển","Vùng cao nguyên"],"ans":0,"difficulty":"medium"},
  {"id":12,"q":"'Bất Tử' có nghĩa là gì?","opts":["Rất mạnh","Không chết, bất diệt","Rất giàu","Rất thông minh"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Chử Đồng Tử học phép tiên ở đâu?","opts":["Trên núi Tản Viên","Trên đường du phương, gặp tiên sư","Trong cung vua","Dưới biển"],"ans":1,"difficulty":"hard"},
  {"id":14,"q":"Lâu đài của Chử Đồng Tử hiện ra như thế nào?","opts":["Xây bình thường","Bay về từ trời","Mọc lên trong một đêm từ cây gậy thần","Đào từ dưới đất"],"ans":2,"difficulty":"medium"},
  {"id":15,"q":"Chử Đồng Tử chôn cha bằng gì?","opts":["Chiếc khố duy nhất","Áo bào","Chiếu cói","Không có gì"],"ans":0,"difficulty":"easy"},
  {"id":16,"q":"Truyện Chử Đồng Tử phản ánh tín ngưỡng gì?","opts":["Thờ Phật","Tu tiên đắc đạo","Thờ cúng tổ tiên","Thờ thần biển"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Tiên Dung phát hiện Chử Đồng Tử khi nào?","opts":["Khi đi dạo","Khi tắm, che màn trúng chỗ chàng vùi mình","Khi đi chợ","Khi đi thuyền"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Sau khi hóa tiên, Chử Đồng Tử được thờ ở đâu?","opts":["Đền Hùng","Nhiều đền dọc sông Hồng","Chùa Một Cột","Không được thờ"],"ans":1,"difficulty":"medium"},
  {"id":19,"q":"Câu chuyện Chử Đồng Tử thuộc thời đại nào?","opts":["Thời nhà Trần","Thời Hùng Vương","Thời nhà Lý","Thời Bắc thuộc"],"ans":1,"difficulty":"easy"},
  {"id":20,"q":"Điều đặc biệt nhất của tình yêu Chử Đồng Tử - Tiên Dung là gì?","opts":["Quyền lực","Vượt qua khoảng cách giàu nghèo","Dựa trên sắp đặt","Chính trị"],"ans":1,"difficulty":"easy"},
]

bank["m_hungvuong"] = [
  {"id":1,"q":"Nhà nước Văn Lang tồn tại qua bao nhiêu đời vua?","opts":["12","15","18","20"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Kinh đô Văn Lang đặt ở đâu?","opts":["Thăng Long","Phong Châu","Hoa Lư","Cổ Loa"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Nhà nước Văn Lang tồn tại trong khoảng thời gian nào?","opts":["2879-258 TCN","1000-500 TCN","500 TCN - 100 SCN","100-938 SCN"],"ans":0,"difficulty":"medium"},
  {"id":4,"q":"Người dân Văn Lang chủ yếu làm gì?","opts":["Buôn bán","Trồng lúa nước","Đánh cá biển","Chăn nuôi du mục"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Hiện vật nổi tiếng nhất thời Văn Lang là gì?","opts":["Kiếm đồng","Trống đồng Đông Sơn","Gương soi","Chuông đồng"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Giỗ Tổ Hùng Vương vào ngày nào?","opts":["Mùng 1/1 âm lịch","Mùng 10/3 âm lịch","Rằm tháng 7","Mùng 5/5 âm lịch"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Phong Châu ngày nay thuộc tỉnh nào?","opts":["Phú Thọ","Vĩnh Phúc","Tuyên Quang","Hà Nội"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Xã hội Văn Lang chia thành mấy tầng lớp?","opts":["2","3","4","5"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Tầng lớp cao nhất trong xã hội Văn Lang là gì?","opts":["Lạc dân","Lạc tướng, Lạc hầu","Nô tì","Thương nhân"],"ans":1,"difficulty":"hard"},
  {"id":10,"q":"Trống đồng Đông Sơn được tìm thấy ở đâu?","opts":["Thanh Hóa","Hà Nội","Đắk Lắk","Quảng Nam"],"ans":0,"difficulty":"hard"},
  {"id":11,"q":"Văn minh nào đặc trưng cho thời Hùng Vương?","opts":["Văn minh đồ sắt","Văn minh lúa nước","Văn minh du mục","Văn minh biển"],"ans":1,"difficulty":"easy"},
  {"id":12,"q":"Ai là vị Hùng Vương cuối cùng?","opts":["Hùng Vương thứ 15","Hùng Vương thứ 18","Hùng Vương thứ 20","Hùng Vương thứ 12"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Sau Văn Lang, nước nào thay thế?","opts":["Đại Việt","Âu Lạc","Nam Việt","Đại Cồ Việt"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Ai lập nước Âu Lạc thay Văn Lang?","opts":["Triệu Đà","An Dương Vương (Thục Phán)","Ngô Quyền","Đinh Bộ Lĩnh"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Ngày Giỗ Tổ Hùng Vương là ngày lễ gì?","opts":["Ngày nghỉ lễ quốc gia","Ngày nghỉ địa phương","Không phải ngày lễ","Ngày nghỉ quốc tế"],"ans":0,"difficulty":"easy"},
  {"id":16,"q":"Đền Hùng nằm ở đâu?","opts":["Núi Nghĩa Lĩnh, Phú Thọ","Núi Ba Vì, Hà Nội","Yên Tử, Quảng Ninh","Hoa Lư, Ninh Bình"],"ans":0,"difficulty":"medium"},
  {"id":17,"q":"Lạc Việt là tên gọi của dân tộc nào?","opts":["Người Trung Hoa","Người Việt cổ","Người Chăm","Người Khmer"],"ans":1,"difficulty":"easy"},
  {"id":18,"q":"Người Văn Lang nhuộm răng đen để làm gì?","opts":["Làm đẹp","Phân biệt với thú rừng và giặc phương Bắc","Chữa bệnh","Nghi lễ tôn giáo"],"ans":1,"difficulty":"medium"},
  {"id":19,"q":"Tục xăm mình thời Văn Lang có ý nghĩa gì?","opts":["Thời trang","Bảo vệ khi xuống nước (tránh thủy quái)","Phân biệt đẳng cấp","Trừ tà"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Văn Lang gồm bao nhiêu bộ (quận)?","opts":["10","15","18","21"],"ans":1,"difficulty":"hard"},
]

bank["m_giongphu"] = [
  {"id":1,"q":"Thánh Gióng bao nhiêu tuổi khi cất tiếng nói đầu tiên?","opts":["1 tuổi","2 tuổi","3 tuổi","5 tuổi"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Thánh Gióng nói gì đầu tiên?","opts":["Con đói","Hãy đúc cho ta ngựa sắt, roi sắt, giáp sắt","Mẹ ơi","Con muốn đi chơi"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Thánh Gióng đánh giặc nào?","opts":["Giặc Tần","Giặc Ân","Giặc Hán","Giặc Thanh"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Sau khi thắng giặc, Thánh Gióng đi đâu?","opts":["Về nhà","Bay về trời","Xuống biển","Vào rừng"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Thánh Gióng thuộc Tứ Bất Tử thứ mấy?","opts":["Thứ nhất","Thứ hai","Thứ ba","Thứ tư"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Ngựa của Thánh Gióng có đặc biệt gì?","opts":["Bay được","Bằng sắt, phun lửa","Biết nói","Biến hình"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Khi roi sắt gãy, Thánh Gióng dùng gì đánh giặc?","opts":["Tay không","Gươm thần","Bụi tre bên đường","Đá"],"ans":2,"difficulty":"medium"},
  {"id":8,"q":"Thánh Gióng bay về trời ở đâu?","opts":["Núi Sóc (Sóc Sơn)","Núi Ba Vì","Đền Hùng","Núi Yên Tử"],"ans":0,"difficulty":"medium"},
  {"id":9,"q":"Truyền thuyết Thánh Gióng tượng trưng cho gì?","opts":["Tình yêu","Sức mạnh bảo vệ tổ quốc","Trí tuệ","Lòng hiếu thảo"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Mẹ Gióng mang thai bằng cách nào?","opts":["Bình thường","Ướm chân vào vết chân khổng lồ ngoài đồng","Được thần ban","Uống nước thần"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Lễ hội Gióng tổ chức ở đâu?","opts":["Sóc Sơn, Hà Nội","Phú Thọ","Ninh Bình","Thanh Hóa"],"ans":0,"difficulty":"medium"},
  {"id":12,"q":"Tre bị cháy ở đâu do ngựa Gióng phun lửa?","opts":["Núi Sóc","Làng Cháy (Gia Lâm)","Sông Hồng","Thăng Long"],"ans":1,"difficulty":"hard"},
  {"id":13,"q":"Thánh Gióng ăn gì để lớn nhanh?","opts":["Hoa quả","Cơm và cà (dân làng mang đến)","Thịt rồng","Không ăn gì"],"ans":1,"difficulty":"easy"},
  {"id":14,"q":"Truyền thuyết Thánh Gióng thuộc đời vua nào?","opts":["Hùng Vương thứ 1","Hùng Vương thứ 6","Hùng Vương thứ 18","An Dương Vương"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Hội Gióng được UNESCO công nhận là gì?","opts":["Di sản tự nhiên","Di sản văn hóa phi vật thể","Di sản kiến trúc","Khu dự trữ sinh quyển"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Vết ngựa sắt phun lửa tạo thành gì?","opts":["Hồ nước","Ao hồ ở Gia Lâm","Sông suối","Núi lửa"],"ans":1,"difficulty":"hard"},
  {"id":17,"q":"Thánh Gióng trước khi nói, có gì đặc biệt?","opts":["Rất thông minh","Không biết nói, không biết đi, không biết cười","Biết bay","Rất mạnh"],"ans":1,"difficulty":"easy"},
  {"id":18,"q":"Dân làng phải làm gì để nuôi Gióng lớn?","opts":["Không cần gì","Góp cơm gạo nuôi vì Gióng ăn rất nhiều","Dâng vàng","Cầu nguyện"],"ans":1,"difficulty":"easy"},
  {"id":19,"q":"Tại sao giặc Ân thua?","opts":["Quân ít","Nhờ sức mạnh thần kỳ của Thánh Gióng","Tự rút lui","Bị phản bội"],"ans":1,"difficulty":"easy"},
  {"id":20,"q":"Sau khi bay về trời, Thánh Gióng được phong gì?","opts":["Vua","Phù Đổng Thiên Vương","Ngọc Hoàng","Thần Sấm"],"ans":1,"difficulty":"medium"},
]

# BATTLE EVENTS
bank["bachang"] = [
  {"id":1,"q":"Trận Bạch Đằng năm 938 do ai chỉ huy phía Việt?","opts":["Lê Lợi","Ngô Quyền","Trần Hưng Đạo","Lý Thường Kiệt"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Quân xâm lược trong trận Bạch Đằng 938 là ai?","opts":["Nhà Tống","Nam Hán","Nhà Minh","Nhà Nguyên"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Chiến thuật chính trong trận Bạch Đằng 938 là gì?","opts":["Phục binh trên núi","Cọc gỗ bọc sắt + thủy triều","Hỏa công","Vây thành"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Trận Bạch Đằng 938 diễn ra trên sông nào?","opts":["Sông Hồng","Sông Bạch Đằng","Sông Mã","Sông Đà"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Chiến thắng Bạch Đằng 938 có ý nghĩa gì?","opts":["Thu phục miền Nam","Chấm dứt hơn 1000 năm Bắc thuộc","Đánh bại Mông Cổ","Thống nhất đất nước"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Ngô Quyền lợi dụng yếu tố tự nhiên nào?","opts":["Gió bão","Thủy triều lên xuống","Sương mù","Mưa lũ"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Tướng Nam Hán chỉ huy là ai?","opts":["Hoằng Tháo","Triệu Đà","Lưu Ẩn","Mã Viện"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Cọc Bạch Đằng được cắm ở đâu?","opts":["Trên bờ","Dưới lòng sông","Trên cầu","Trong rừng"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Ngô Quyền quê ở đâu?","opts":["Thanh Hóa","Đường Lâm (Hà Nội ngày nay)","Ninh Bình","Phú Thọ"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Sau trận Bạch Đằng, Ngô Quyền xưng gì?","opts":["Hoàng đế","Vương (Ngô Vương)","Tiết độ sứ","Tổng đốc"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Sông Bạch Đằng ngày nay thuộc tỉnh nào?","opts":["Hải Phòng - Quảng Ninh","Hà Nội","Thanh Hóa","Nam Định"],"ans":0,"difficulty":"medium"},
  {"id":12,"q":"Cọc được bọc bằng vật liệu gì?","opts":["Đồng","Sắt","Vàng","Chì"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Dương Đình Nghệ là ai đối với Ngô Quyền?","opts":["Cha đẻ","Cha vợ (bố vợ)","Anh em","Không quen biết"],"ans":1,"difficulty":"hard"},
  {"id":14,"q":"Kiều Công Tiễn làm gì khiến Ngô Quyền nổi giận?","opts":["Cướp ngôi","Giết Dương Đình Nghệ và cầu cứu Nam Hán","Phản bội","Bỏ trốn"],"ans":1,"difficulty":"hard"},
  {"id":15,"q":"Khi thủy triều rút, điều gì xảy ra?","opts":["Cọc nhọn nhô lên, đâm thủng thuyền giặc","Sông cạn, quân ta tấn công","Giặc mắc cạn","Tất cả đều đúng"],"ans":0,"difficulty":"medium"},
  {"id":16,"q":"Ngô Quyền dụ quân Nam Hán vào bãi cọc bằng cách nào?","opts":["Giả thua chạy bằng thuyền nhỏ","Hẹn đánh","Thách đấu","Đốt lửa"],"ans":0,"difficulty":"medium"},
  {"id":17,"q":"Hoằng Tháo kết cục thế nào?","opts":["Bị bắt sống","Chết đuối trong trận chiến","Trốn về nước","Đầu hàng"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Trận Bạch Đằng có mấy lần xảy ra trong lịch sử?","opts":["1","2","3","4"],"ans":2,"difficulty":"hard"},
  {"id":19,"q":"Sau Ngô Quyền, đất nước xảy ra tình trạng gì?","opts":["Thịnh vượng","Loạn 12 sứ quân","Bắc thuộc lại","Hòa bình lâu dài"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Ngô Quyền đóng đô ở đâu?","opts":["Thăng Long","Cổ Loa","Hoa Lư","Phú Xuân"],"ans":1,"difficulty":"medium"},
]

bank["haiba"] = [
  {"id":1,"q":"Hai Bà Trưng khởi nghĩa năm nào?","opts":["40 TCN","40 SCN","43 SCN","111 TCN"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Tên hai chị em Trưng là gì?","opts":["Trưng Trắc và Trưng Nhị","Trưng Nhất và Trưng Nhị","Bà Triệu và Trưng Trắc","Tiên Dung và Mị Nương"],"ans":0,"difficulty":"easy"},
  {"id":3,"q":"Chồng Trưng Trắc tên gì?","opts":["Thi Sách","Lý Bí","Triệu Quang Phục","Phùng Hưng"],"ans":0,"difficulty":"easy"},
  {"id":4,"q":"Hai Bà Trưng chống lại quân nào?","opts":["Nam Hán","Đông Hán","Nhà Tống","Nhà Minh"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Khởi nghĩa xuất phát từ đâu?","opts":["Cổ Loa","Mê Linh","Thăng Long","Hoa Lư"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Hai Bà Trưng thu phục bao nhiêu thành trì?","opts":["30","50","65","100"],"ans":2,"difficulty":"medium"},
  {"id":7,"q":"Hai Bà Trưng cầm quyền được bao lâu?","opts":["1 năm","3 năm","5 năm","10 năm"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Tướng nhà Hán đem quân đàn áp là ai?","opts":["Triệu Đà","Mã Viện","Lưu Bang","Tào Tháo"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Hai Bà Trưng hy sinh như thế nào?","opts":["Bị bắt","Nhảy xuống sông Hát tự vẫn","Chết trong trận chiến","Tuổi già"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Mê Linh ngày nay thuộc tỉnh/thành nào?","opts":["Hà Nội (Vĩnh Phúc cũ)","Phú Thọ","Ninh Bình","Thanh Hóa"],"ans":0,"difficulty":"medium"},
  {"id":11,"q":"Hai Bà Trưng xưng vương, đặt đô ở đâu?","opts":["Cổ Loa","Mê Linh","Phong Châu","Long Biên"],"ans":1,"difficulty":"medium"},
  {"id":12,"q":"Điểm đặc biệt của khởi nghĩa Hai Bà Trưng?","opts":["Dùng voi chiến","Phụ nữ lãnh đạo","Kéo dài lâu nhất","Đông người nhất"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Thi Sách bị ai giết?","opts":["Triệu Đà","Tô Định (thái thú nhà Hán)","Mã Viện","Lưu Bị"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Nguyên nhân chính của cuộc khởi nghĩa là gì?","opts":["Muốn lập nước mới","Chống ách đô hộ tàn bạo của Tô Định + trả thù cho Thi Sách","Tranh giành quyền lực","Xung đột tôn giáo"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Có bao nhiêu nữ tướng tham gia khởi nghĩa?","opts":["Chỉ 2","Hàng chục","Hàng trăm","Không có ai khác"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Hai Bà Trưng cưỡi gì ra trận?","opts":["Ngựa","Voi","Thuyền","Xe ngựa"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Đền thờ Hai Bà Trưng nổi tiếng ở đâu?","opts":["Hát Môn, Hà Nội","Phú Thọ","Ninh Bình","Đà Nẵng"],"ans":0,"difficulty":"hard"},
  {"id":18,"q":"Sông Hát nằm ở đâu?","opts":["Hà Nội (hợp lưu sông Đáy)","Thanh Hóa","Ninh Bình","Nam Định"],"ans":0,"difficulty":"hard"},
  {"id":19,"q":"Khởi nghĩa Hai Bà Trưng có ý nghĩa gì?","opts":["Giành độc lập lâu dài","Chứng minh tinh thần yêu nước, ý chí chống ngoại xâm","Thống nhất đất nước","Mở rộng lãnh thổ"],"ans":1,"difficulty":"easy"},
  {"id":20,"q":"Sau thất bại, tình trạng đất nước như thế nào?","opts":["Độc lập","Tiếp tục Bắc thuộc","Hòa bình","Chia cắt"],"ans":1,"difficulty":"easy"},
]

bank["dinhtien"] = [
  {"id":1,"q":"Đinh Bộ Lĩnh dẹp loạn mấy sứ quân?","opts":["8","10","12","15"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Quốc hiệu do Đinh Tiên Hoàng đặt là gì?","opts":["Đại Việt","Đại Cồ Việt","Văn Lang","Âu Lạc"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Kinh đô nhà Đinh đặt ở đâu?","opts":["Thăng Long","Hoa Lư","Phú Xuân","Cổ Loa"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Đinh Bộ Lĩnh thống nhất đất nước năm nào?","opts":["938","968","981","1009"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Hoa Lư ngày nay thuộc tỉnh nào?","opts":["Ninh Bình","Thanh Hóa","Hà Nội","Nam Định"],"ans":0,"difficulty":"medium"},
  {"id":6,"q":"Đinh Bộ Lĩnh quê ở đâu?","opts":["Ninh Bình","Thanh Hóa","Hà Nội","Phú Thọ"],"ans":0,"difficulty":"medium"},
  {"id":7,"q":"Loạn 12 sứ quân xảy ra sau cái chết của vua nào?","opts":["An Dương Vương","Ngô Quyền","Hùng Vương","Lý Bí"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Đinh Bộ Lĩnh từ nhỏ nổi tiếng với trò chơi gì?","opts":["Đánh trận giả, cờ lau","Đá cầu","Bắn cung","Cưỡi ngựa"],"ans":0,"difficulty":"easy"},
  {"id":9,"q":"Nhà Đinh tồn tại bao lâu?","opts":["5 năm","12 năm","20 năm","50 năm"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Đinh Tiên Hoàng xưng hiệu gì?","opts":["Vương","Đế (Đại Thắng Minh Hoàng Đế)","Tiết độ sứ","Chúa"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Ai giết Đinh Tiên Hoàng?","opts":["Quân Tống","Đỗ Thích (hoạn quan)","Lê Hoàn","12 sứ quân"],"ans":1,"difficulty":"hard"},
  {"id":12,"q":"Sau Đinh Tiên Hoàng, ai lên thay?","opts":["Con trai nhỏ (Đinh Toàn)","Lê Hoàn","Ngô Quyền","Lý Công Uẩn"],"ans":0,"difficulty":"medium"},
  {"id":13,"q":"Lê Hoàn (Lê Đại Hành) đóng vai trò gì thời nhà Đinh?","opts":["Tướng quân","Thập đạo tướng quân (nhiếp chính)","Quan văn","Hoàng tử"],"ans":1,"difficulty":"hard"},
  {"id":14,"q":"Nhà Đinh là triều đại phong kiến thứ mấy?","opts":["Đầu tiên sau Bắc thuộc","Thứ hai","Thứ ba","Thứ tư"],"ans":0,"difficulty":"medium"},
  {"id":15,"q":"Đinh Bộ Lĩnh dùng biện pháp gì để trấn áp?","opts":["Thương lượng","Vạc dầu sôi, chuồng hổ dữ","Bỏ tù","Đày đi xa"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Đại Cồ Việt có nghĩa là gì?","opts":["Nước Việt lớn","Nước Việt vĩ đại","Cồ = to lớn, Đại Việt to lớn","Tất cả đều đúng"],"ans":2,"difficulty":"hard"},
  {"id":17,"q":"Đinh Bộ Lĩnh thường được gọi là gì khi nhỏ?","opts":["Cậu bé Cờ Lau","Cậu bé vàng","Tiểu tướng quân","Thần đồng"],"ans":0,"difficulty":"easy"},
  {"id":18,"q":"Nhà Đinh kết thúc vì sao?","opts":["Bị quân Tống diệt","Vua bị giết, con nhỏ không giữ được ngôi","Tự sụp đổ","Bị lật đổ bởi dân"],"ans":1,"difficulty":"medium"},
  {"id":19,"q":"Loạn 12 sứ quân kéo dài bao lâu?","opts":["10 năm","Khoảng 20 năm (944-968)","50 năm","5 năm"],"ans":1,"difficulty":"hard"},
  {"id":20,"q":"Ý nghĩa của việc Đinh Bộ Lĩnh dẹp loạn?","opts":["Mở rộng lãnh thổ","Thống nhất đất nước sau loạn lạc","Đánh bại ngoại xâm","Xây dựng kinh tế"],"ans":1,"difficulty":"easy"},
]

# ============ More myth events ============

bank["m_cholua"] = [
  {"id":1,"q":"Chú Cuội cung trăng gắn liền với cây gì?","opts":["Cây đào","Cây đa","Cây bàng","Cây tre"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Tại sao Cuội bay lên mặt trăng?","opts":["Muốn du lịch","Cây đa bật gốc bay lên trời, Cuội bám theo","Được tiên đưa lên","Bị trừng phạt"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Cuội có phép thuật gì đặc biệt?","opts":["Biến hình","Cây đa hồi sinh mọi vật","Bay","Tàng hình"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Vợ Cuội có tính xấu gì?","opts":["Tham lam","Hay quên (hay nói dối, tưới nước bẩn vào cây)","Lười biếng","Ghen tuông"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Trẻ em nhìn thấy gì trên mặt trăng theo truyền thuyết?","opts":["Con thỏ","Hình chú Cuội ngồi gốc cây đa","Tiên nữ","Không gì cả"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Dịp nào trẻ em ca hát về Cuội?","opts":["Tết Nguyên Đán","Trung Thu (Rằm tháng 8)","Giỗ Tổ","Tết Hàn thực"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Cuội được miêu tả là người như thế nào?","opts":["Thông minh nhưng hay nói dối","Dũng cảm","Giàu có","Hiền lành"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Cây đa bật gốc vì lý do gì?","opts":["Gió bão","Vợ Cuội tưới nước bẩn/nước tiểu vào gốc cây","Bị chặt","Tự bật"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Bài hát nổi tiếng về Cuội bắt đầu như thế nào?","opts":["Cuội ơi Cuội","Chú Cuội ngồi gốc cây đa","Trăng ơi trăng","Cuội bay lên trời"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Truyện Cuội thuộc thể loại gì?","opts":["Thần thoại","Cổ tích dân gian","Truyền thuyết lịch sử","Sử thi"],"ans":1,"difficulty":"easy"},
]

bank["m_maiden"] = [
  {"id":1,"q":"Liễu Hạnh thuộc Tứ Bất Tử thứ mấy?","opts":["Thứ nhất","Thứ hai","Thứ ba","Thứ tư"],"ans":3,"difficulty":"easy"},
  {"id":2,"q":"Bà Chúa Liễu Hạnh từ đâu xuống trần?","opts":["Biển","Thiên đình (con gái Ngọc Hoàng)","Rừng","Núi"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Đạo Mẫu thờ ai?","opts":["Phật","Các Mẫu (bao gồm Liễu Hạnh)","Ngọc Hoàng","Thần biển"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Phủ Dày ở đâu?","opts":["Hà Nội","Nam Định","Thanh Hóa","Ninh Bình"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Tín ngưỡng thờ Mẫu được UNESCO công nhận là gì?","opts":["Di sản tự nhiên","Di sản văn hóa phi vật thể","Di sản kiến trúc","Không được công nhận"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Bà Liễu Hạnh nổi tiếng về phẩm chất gì?","opts":["Sức mạnh","Tài sắc vẹn toàn, đồng cảm với phụ nữ","Nấu ăn giỏi","Giàu có"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Nghi lễ đặc trưng của đạo Mẫu là gì?","opts":["Thiền","Hầu đồng","Bói toán","Cúng dường"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Liễu Hạnh hạ phàm mấy lần?","opts":["1","2","3","4"],"ans":2,"difficulty":"hard"},
  {"id":9,"q":"Tam Tòa Thánh Mẫu gồm những ai?","opts":["Mẫu Thượng Thiên, Mẫu Thượng Ngàn, Mẫu Thoải","Liễu Hạnh, Âu Cơ, Tiên Dung","Phật Bà, Mẫu, Tiên","Chỉ Liễu Hạnh"],"ans":0,"difficulty":"hard"},
  {"id":10,"q":"Tứ Bất Tử Việt Nam gồm những ai?","opts":["Tản Viên, Gióng, Chử Đồng Tử, Liễu Hạnh","Sơn Tinh, Thủy Tinh, Gióng, Cuội","An Dương Vương, Hùng Vương, Liễu Hạnh, Gióng","Lạc Long Quân, Âu Cơ, Gióng, Liễu Hạnh"],"ans":0,"difficulty":"medium"},
]

bank["m_trungquoc"] = [
  {"id":1,"q":"'Con Rồng cháu Tiên' là cách người Việt gọi mình, nghĩa là gì?","opts":["Hậu duệ rồng và tiên","Con của thần","Hậu duệ vua","Con cháu trời"],"ans":0,"difficulty":"easy"},
  {"id":2,"q":"Rồng trong văn hóa Việt tượng trưng cho gì?","opts":["Chiến tranh","Sức mạnh, quyền uy, nguồn nước","Sự chết chóc","Sự lười biếng"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Tiên trong văn hóa Việt tượng trưng cho gì?","opts":["Sức mạnh","Vẻ đẹp, thanh cao, núi rừng","Biển cả","Chiến tranh"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Tổ tiên người Việt sinh sống chủ yếu ở đâu?","opts":["Vùng núi cao","Đồng bằng sông Hồng","Sa mạc","Cao nguyên"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Truyền thuyết 'Rồng Tiên' có ý nghĩa giáo dục gì?","opts":["Tự hào dân tộc, đoàn kết","Sùng bái vật chất","Sợ hãi thiên nhiên","Tôn thờ vua"],"ans":0,"difficulty":"easy"},
  {"id":6,"q":"Văn minh lúa nước phát triển mạnh ở vùng nào?","opts":["Vùng núi","Đồng bằng sông Hồng","Tây Nguyên","Duyên hải miền Trung"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"100 con của Lạc Long Quân và Âu Cơ đại diện cho gì?","opts":["Các dân tộc anh em","Các triều đại","Các vị thần","Các ngôi sao"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Hình tượng rồng Việt khác rồng Trung Quốc ở điểm nào?","opts":["Giống hệt","Mảnh mai, duyên dáng hơn, thường gắn với nước","To lớn hơn","Có cánh"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Bọc trăm trứng tượng trưng cho điều gì?","opts":["Sự giàu có","Cùng một bọc = anh em một nhà","Sức mạnh siêu nhiên","Phép thuật"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Người Việt có bao nhiêu dân tộc?","opts":["30","48","54","60"],"ans":2,"difficulty":"medium"},
]

bank["m_phongtho"] = [
  {"id":1,"q":"Thần Núi trong tín ngưỡng Việt thường được gọi là gì?","opts":["Sơn Tinh","Thủy Tinh","Long Vương","Táo Quân"],"ans":0,"difficulty":"easy"},
  {"id":2,"q":"Thần Biển trong tín ngưỡng Việt thường là ai?","opts":["Sơn Tinh","Thủy Tinh","Mẫu Thoải","Hải Vương"],"ans":2,"difficulty":"medium"},
  {"id":3,"q":"Ngư dân Việt Nam thường thờ ai trước khi ra khơi?","opts":["Phật","Cá Ông (cá voi) / Thần Biển","Ngọc Hoàng","Thổ Địa"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Tín ngưỡng thờ Thần Núi phổ biến ở vùng nào?","opts":["Miền biển","Miền núi phía Bắc","Miền Tây Nam Bộ","Tây Nguyên"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Lễ hội Cầu Ngư gắn với tín ngưỡng gì?","opts":["Thần Rừng","Thần Biển / Cá Ông","Thần Lúa","Thần Núi"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Núi Ba Vì được coi là nơi ở của thần nào?","opts":["Thủy Tinh","Sơn Tinh (Tản Viên Sơn Thánh)","Ngọc Hoàng","Táo Quân"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"'Thần' trong tín ngưỡng Việt nghĩa là gì?","opts":["Người bình thường","Lực lượng siêu nhiên bảo hộ","Quỷ dữ","Động vật"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Việt Nam có bao nhiêu ngọn núi thiêng nổi tiếng?","opts":["3","5","Rất nhiều (mỗi vùng có núi thiêng)","Không có"],"ans":2,"difficulty":"medium"},
  {"id":9,"q":"Tàu thuyền treo gì để xin Thần Biển bảo hộ?","opts":["Cờ đỏ","Con mắt (vẽ mắt trước mũi thuyền)","Đèn lồng","Gương"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Tín ngưỡng thờ Thần Núi, Thần Biển cho thấy gì?","opts":["Mê tín","Sự hòa hợp giữa con người và thiên nhiên","Sợ hãi","Lạc hậu"],"ans":1,"difficulty":"easy"},
]

bank["m_coloa"] = [
  {"id":1,"q":"Thành Cổ Loa do ai xây?","opts":["Hùng Vương","An Dương Vương","Ngô Quyền","Lý Thái Tổ"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Thành Cổ Loa có mấy vòng thành?","opts":["2","3","5","9"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Hình dáng thành Cổ Loa là gì?","opts":["Hình vuông","Hình xoắn ốc","Hình tròn","Hình chữ nhật"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Thành Cổ Loa dùng làm kinh đô nước nào?","opts":["Văn Lang","Âu Lạc","Đại Việt","Nam Việt"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Thành Cổ Loa nằm ở đâu ngày nay?","opts":["Đông Anh, Hà Nội","Ninh Bình","Phú Thọ","Thanh Hóa"],"ans":0,"difficulty":"medium"},
  {"id":6,"q":"Ai đã giúp xây thành Cổ Loa?","opts":["Ngọc Hoàng","Rùa Vàng (Kim Quy)","Sơn Tinh","Long Vương"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Mục đích chính của thành Cổ Loa?","opts":["Để ở","Phòng thủ quân sự","Buôn bán","Du lịch"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Thành Cổ Loa được xây vào khoảng năm nào?","opts":["2879 TCN","500 TCN","257 TCN","179 TCN"],"ans":2,"difficulty":"medium"},
  {"id":9,"q":"Thành Cổ Loa thất thủ vì lý do gì?","opts":["Tường yếu","Mất nỏ thần (Trọng Thủy đánh cắp)","Quân ít","Thiếu lương"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Thành Cổ Loa ngày nay là di tích gì?","opts":["Chùa","Di tích lịch sử quốc gia đặc biệt","Bảo tàng","Công viên"],"ans":1,"difficulty":"medium"},
]

bank["m_nothanbao"] = [
  {"id":1,"q":"Nỏ thần Kim Quy bắn một phát có thể giết bao nhiêu quân?","opts":["10","100","Hàng nghìn","Vô số"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Lẫy nỏ thần làm từ gì?","opts":["Sắt","Vuốt (móng) Rùa Vàng","Vàng","Ngọc"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Ai đã đánh cắp lẫy nỏ?","opts":["Triệu Đà","Trọng Thủy","Tô Định","Mã Viện"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Nỏ thần giúp An Dương Vương đánh bại ai?","opts":["Quân Hán","Quân Triệu Đà (lần đầu)","Giặc Ân","Quân Minh"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Khi nỏ thần mất, An Dương Vương còn gì?","opts":["Quân đội mạnh","Không còn gì, thua trận","Gươm thần","Thành cao"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Truyền thuyết nỏ thần dạy bài học gì?","opts":["Vũ khí là tất cả","Cảnh giác, không chủ quan","Phải có nỏ mới thắng","Phải giàu"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Nỏ thần được sử dụng ở thành nào?","opts":["Phong Châu","Cổ Loa","Thăng Long","Hoa Lư"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Rùa Vàng tặng nỏ cho An Dương Vương nhân dịp nào?","opts":["Sinh nhật","Sau khi giúp xây xong thành Cổ Loa","Lễ hội","Chiến thắng"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Trọng Thủy thay lẫy nỏ bằng cái gì?","opts":["Lẫy giả trông giống thật","Không thay, chỉ lấy","Lẫy đồng","Lẫy gỗ"],"ans":0,"difficulty":"medium"},
  {"id":10,"q":"Kết quả khi dùng nỏ với lẫy giả?","opts":["Vẫn bắn được","Không bắn được, An Dương Vương thua","Bắn yếu hơn","Nổ tung"],"ans":1,"difficulty":"easy"},
]

bank["m_mychau"] = [
  {"id":1,"q":"Mị Châu là con gái ai?","opts":["Hùng Vương","An Dương Vương","Triệu Đà","Ngô Quyền"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Mị Châu rắc gì dọc đường chạy trốn?","opts":["Gạo","Lông ngỗng","Cánh hoa","Vải"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Mục đích Mị Châu rắc lông ngỗng?","opts":["Làm dấu cho Trọng Thủy tìm theo","Trang trí","Xua đuổi thú","Để tìm đường về"],"ans":0,"difficulty":"easy"},
  {"id":4,"q":"Mị Châu có biết Trọng Thủy là gián điệp không?","opts":["Biết nhưng yêu","Không biết (ngây thơ tin chồng)","Biết từ đầu","Được cảnh báo"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Sau cái chết, máu Mị Châu hóa thành gì?","opts":["Hoa","Ngọc trai","Đá quý","San hô"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Lông ngỗng của Mị Châu giúp ai?","opts":["Cha nàng","Quân Triệu Đà đuổi theo","Dân làng","Không ai"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Bi kịch Mị Châu phản ánh xung đột gì?","opts":["Tình yêu - tổ quốc","Giàu - nghèo","Già - trẻ","Thiện - ác"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Câu chuyện cảnh báo điều gì?","opts":["Không nên yêu","Cảnh giác với kẻ thù dù trong quan hệ thân cận","Không nên cưới người nước ngoài","Không nên tin ai"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Tượng Mị Châu ở Cổ Loa quay mặt hướng nào?","opts":["Hướng bắc","Quay lưng vào đền (không quay mặt vào An Dương Vương)","Hướng đông","Không có tượng"],"ans":1,"difficulty":"hard"},
  {"id":10,"q":"Rùa Vàng nói 'kẻ thù ngồi sau lưng' ám chỉ ai?","opts":["Quân Triệu Đà","Mị Châu","Trọng Thủy","Lý Thông"],"ans":1,"difficulty":"medium"},
]

bank["m_tuongda"] = [
  {"id":1,"q":"Triệu Đà lập nước nào?","opts":["Đại Việt","Nam Việt","Âu Lạc","Văn Lang"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nam Việt bao gồm vùng nào?","opts":["Chỉ Việt Nam","Quảng Đông, Quảng Tây, Bắc Việt Nam","Toàn Đông Nam Á","Chỉ miền Nam"],"ans":1,"difficulty":"medium"},
  {"id":3,"q":"Triệu Đà gốc người nước nào?","opts":["Việt","Trung Quốc (Nhà Tần/Triệu)","Champa","Khmer"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Triệu Đà dùng kế gì lấy Âu Lạc?","opts":["Tấn công trực tiếp","Kế hôn nhân (gửi Trọng Thủy)","Hối lộ","Phong tỏa"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Kinh đô Nam Việt ở đâu?","opts":["Cổ Loa","Phiên Ngung (Quảng Châu ngày nay)","Thăng Long","Hoa Lư"],"ans":1,"difficulty":"hard"},
  {"id":6,"q":"Nam Việt tồn tại từ năm nào đến năm nào?","opts":["257-207 TCN","207-111 TCN","111 TCN - 40 SCN","40-938 SCN"],"ans":1,"difficulty":"hard"},
  {"id":7,"q":"Ai đã diệt nước Nam Việt?","opts":["An Dương Vương","Nhà Hán","Nhà Tống","Nhà Minh"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Triệu Đà có được công nhận là vua lịch sử Việt không?","opts":["Có (trước đây được ghi vào sử)","Không bao giờ","Chỉ ở miền Nam","Chỉ thời Pháp"],"ans":0,"difficulty":"hard"},
  {"id":9,"q":"Sau Nam Việt bị Hán diệt, Việt Nam rơi vào thời kỳ gì?","opts":["Độc lập","Bắc thuộc lần 1","Thời Văn Lang","Thời Âu Lạc"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Triệu Đà xưng hiệu gì?","opts":["Hoàng đế","Nam Việt Vũ Vương (Đế)","Tiết độ sứ","Chúa"],"ans":1,"difficulty":"medium"},
]

bank["m_rua"] = [
  {"id":1,"q":"Rùa Vàng (Kim Quy) giúp ai xây thành Cổ Loa?","opts":["Hùng Vương","An Dương Vương","Ngô Quyền","Lý Thái Tổ"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Rùa Vàng tặng An Dương Vương vật gì?","opts":["Gươm thần","Vuốt (lẫy nỏ thần)","Vàng bạc","Ngọc quý"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Rùa Vàng xuất hiện trong huyền thoại nào khác?","opts":["Tấm Cám","Hoàn Kiếm (trả gươm cho Rùa Vàng)","Thạch Sanh","Chử Đồng Tử"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Rùa vàng tượng trưng cho gì trong văn hóa Việt?","opts":["Sự giàu có","Trí tuệ, sức mạnh thần thánh","Chiến tranh","Tình yêu"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Lê Lợi trả gươm cho Rùa vàng ở đâu?","opts":["Sông Hồng","Hồ Hoàn Kiếm","Biển Đông","Sông Bạch Đằng"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Hồ Hoàn Kiếm có nghĩa là gì?","opts":["Hồ đẹp","Hồ trả gươm","Hồ vàng","Hồ rùa"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Rùa trong văn hóa Á Đông tượng trưng cho gì?","opts":["Tốc độ","Trường thọ, ổn định","Sức mạnh","Sự nhanh nhẹn"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Cụ Rùa Hồ Gươm là loài gì?","opts":["Rùa biển","Rùa Hoàn Kiếm (Rafetus swinhoei)","Rùa đất","Rùa tai đỏ"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Rùa Vàng cảnh báo An Dương Vương câu gì?","opts":["Hãy chiến đấu","Kẻ thù ngồi sau lưng ngươi","Hãy chạy đi","Đừng tin ai"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Rùa Vàng xuất hiện bao nhiêu lần trong lịch sử VN?","opts":["1","2 (An Dương Vương và Lê Lợi)","3","4"],"ans":1,"difficulty":"medium"},
]

bank["m_than"] = [
  {"id":1,"q":"Thần Thánh nào được thờ phổ biến nhất trong dân gian Việt?","opts":["Ngọc Hoàng","Thổ Công, Thần Tài, Ông Địa","Phật","Chúa"],"ans":1,"difficulty":"medium"},
  {"id":2,"q":"Ông Táo là gì?","opts":["Thần Bếp, về trời báo cáo Ngọc Hoàng ngày 23 tháng Chạp","Thần Rừng","Thần Sông","Thần Đất"],"ans":0,"difficulty":"easy"},
  {"id":3,"q":"Ông Địa (Thổ Địa) bảo hộ gì?","opts":["Biển cả","Đất đai, nhà cửa","Chiến tranh","Mưa gió"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Thần Tài mang lại gì?","opts":["Sức khỏe","Tài lộc, tiền bạc","Hạnh phúc","Tri thức"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Ngày vía Thần Tài là ngày nào?","opts":["Mùng 1 Tết","Mùng 10 tháng Giêng","Rằm tháng 7","Mùng 5 tháng 5"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Ông Táo cưỡi gì về trời?","opts":["Mây","Cá chép","Rồng","Phượng hoàng"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Tín ngưỡng thờ Thần trong dân gian Việt thuộc dạng nào?","opts":["Phật giáo","Đa thần (thờ nhiều vị thần)","Nhất thần","Vô thần"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Thành Hoàng là vị thần nào?","opts":["Thần bảo hộ làng xã","Thần chiến tranh","Thần mưa","Thần gió"],"ans":0,"difficulty":"medium"},
  {"id":9,"q":"Đình làng Việt Nam dùng để làm gì?","opts":["Trường học","Thờ Thành Hoàng và hội họp","Bệnh viện","Chợ"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Tín ngưỡng dân gian Việt chịu ảnh hưởng của những gì?","opts":["Chỉ Phật giáo","Bản địa + Phật + Đạo + Nho giáo","Chỉ Nho giáo","Chỉ Đạo giáo"],"ans":1,"difficulty":"medium"},
]

bank["m_ongdong"] = [
  {"id":1,"q":"Trống đồng Đông Sơn thuộc nền văn hóa nào?","opts":["Văn hóa Hòa Bình","Văn hóa Đông Sơn","Văn hóa Sa Huỳnh","Văn hóa Óc Eo"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Trống đồng được sử dụng để làm gì?","opts":["Nấu ăn","Nghi lễ, tín ngưỡng, chỉ huy chiến trận","Đựng nước","Trang trí"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Hoa văn chính trên mặt trống đồng là gì?","opts":["Rồng","Ngôi sao (mặt trời) ở trung tâm","Hoa sen","Chim phượng"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Trống đồng lớn nhất phát hiện ở đâu?","opts":["Quảng Ninh","Thanh Hóa (Ngọc Lũ cũng ở Hà Nam)","Hà Nội","Phú Thọ"],"ans":1,"difficulty":"hard"},
  {"id":5,"q":"Trống Ngọc Lũ nổi tiếng được tìm thấy ở tỉnh nào?","opts":["Thanh Hóa","Hà Nam","Phú Thọ","Ninh Bình"],"ans":1,"difficulty":"hard"},
  {"id":6,"q":"Trống đồng thuộc thời đại nào?","opts":["Đồ đá","Đồ đồng (đồng thau)","Đồ sắt","Cận đại"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Hình ảnh gì thường khắc quanh mặt trống?","opts":["Chữ viết","Người múa, chim, hươu, thuyền","Xe ngựa","Thành quách"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Trống đồng có niên đại khoảng bao lâu?","opts":["1000 năm","2000-2500 năm","5000 năm","500 năm"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Trống đồng Đông Sơn cho thấy người Việt cổ giỏi gì?","opts":["Xây thành","Luyện kim, đúc đồng","Dệt vải","Làm gốm"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Nước nào khác trong khu vực cũng tìm thấy trống đồng?","opts":["Chỉ Việt Nam","Indonesia, Malaysia, Lào, Campuchia,...","Chỉ Trung Quốc","Chỉ Nhật Bản"],"ans":1,"difficulty":"medium"},
]

bank["m_bachu"] = [
  {"id":1,"q":"Bà Chúa Xứ được thờ ở đâu?","opts":["Hà Nội","Núi Sam, An Giang","Huế","Đà Nẵng"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Tượng Bà Chúa Xứ làm từ chất liệu gì?","opts":["Gỗ","Đá (sa thạch)","Đồng","Vàng"],"ans":1,"difficulty":"medium"},
  {"id":3,"q":"Lễ vía Bà Chúa Xứ vào tháng mấy âm lịch?","opts":["Tháng 1","Tháng 4","Tháng 7","Tháng 10"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Tín ngưỡng thờ Bà Chúa Xứ có nguồn gốc liên quan đến nền văn hóa nào?","opts":["Việt cổ","Chăm Pa (Óc Eo, Hindu)","Trung Quốc","Nhật Bản"],"ans":1,"difficulty":"hard"},
  {"id":5,"q":"Miếu Bà Chúa Xứ thu hút bao nhiêu lượt khách mỗi năm?","opts":["Vài nghìn","Hàng triệu","Vài trăm","Vài chục"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Người đến miếu Bà thường cầu gì?","opts":["Chỉ sức khỏe","Tài lộc, may mắn, bình an","Chỉ tình yêu","Chỉ chiến thắng"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Núi Sam thuộc tỉnh nào?","opts":["Kiên Giang","An Giang","Cần Thơ","Đồng Tháp"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Tượng Bà có nguồn gốc từ thế kỷ nào?","opts":["Thế kỷ 1","Thế kỷ 6-7","Thế kỷ 15","Thế kỷ 19"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Lễ hội Vía Bà kéo dài mấy ngày?","opts":["1 ngày","3-4 ngày","7 ngày","1 tháng"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Tín ngưỡng Bà Chúa Xứ phổ biến ở vùng nào?","opts":["Miền Bắc","Miền Nam (đặc biệt Tây Nam Bộ)","Miền Trung","Tây Nguyên"],"ans":1,"difficulty":"easy"},
]

bank["m_phucuc"] = [
  {"id":1,"q":"'Cá Ông' là tên gọi dân gian cho con gì?","opts":["Cá mập","Cá voi","Cá ngừ","Cá heo"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Ngư dân Việt thờ Cá Ông vì sao?","opts":["Để được nhiều cá","Tin Cá Ông cứu người gặp nạn trên biển","Sợ bị Cá Ông tấn công","Truyền thống Trung Quốc"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Lễ Nghinh Ông là lễ hội gì?","opts":["Mừng năm mới","Đón rước Cá Ông, cầu ngư","Cưới hỏi","Thu hoạch lúa"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Khi Cá Ông (cá voi) chết dạt vào bờ, ngư dân làm gì?","opts":["Ăn thịt","Tổ chức tang lễ, chôn cất trang trọng","Đẩy ra biển","Bỏ đi"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Lăng Ông là gì?","opts":["Đền thờ vua","Nơi thờ xương cá voi","Nhà ở","Bảo tàng"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Tín ngưỡng thờ Cá Ông phổ biến ở vùng nào?","opts":["Miền núi","Duyên hải miền Trung và Nam Bộ","Tây Nguyên","Miền Bắc"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Truyền thuyết kể Cá Ông là ai?","opts":["Con của Thủy Tinh","Áo vải của Phật Bà Quan Âm hóa thành","Con rồng","Tiên cá"],"ans":1,"difficulty":"hard"},
  {"id":8,"q":"Ngày Lễ Nghinh Ông thường diễn ra vào tháng nào?","opts":["Tháng 1","Tháng 3-4 hoặc tháng 8 âm lịch","Tháng 7","Tháng 12"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Người gặp Cá Ông trên biển phải làm gì?","opts":["Đuổi đi","Cung kính, xin bình an","Bắt lại","Bỏ chạy"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Tín ngưỡng thờ Cá Ông phản ánh nghề gì?","opts":["Nông nghiệp","Nghề biển, đánh cá","Chăn nuôi","Buôn bán"],"ans":1,"difficulty":"easy"},
]

bank["m_tiensau"] = [
  {"id":1,"q":"Chàng tiều phu trong truyện cổ tích thường làm nghề gì?","opts":["Buôn bán","Đốn củi","Đánh cá","Chăn trâu"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nàng Tiên giúp chàng tiều phu bằng cách nào?","opts":["Cho vàng","Giúp đỡ, dạy làm ăn, ban phép lành","Cho vũ khí","Cho ngựa"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Truyện cổ tích VN thường kết thúc bằng gì?","opts":["Bi kịch","Ở hiền gặp lành, hạnh phúc","Chiến tranh","Không rõ"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Áo cánh tiên trong truyện dùng để làm gì?","opts":["Làm đẹp","Bay về trời","Biến hình","Tàng hình"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Chàng tiều phu giấu áo tiên để làm gì?","opts":["Bán","Giữ nàng Tiên ở lại trần gian","Trang trí","Sưu tập"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Motif 'chàng trai nghèo lấy vợ tiên' phổ biến ở đâu?","opts":["Chỉ Việt Nam","Nhiều nền văn hóa Á Đông","Chỉ Trung Quốc","Châu Âu"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Bi kịch trong truyện là gì?","opts":["Chàng trai phải đi lính","Nàng tiên tìm được áo và bay về trời","Chàng trai chết","Không có bi kịch"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Truyện dạy bài học gì?","opts":["Phải giấu giếm","Tình yêu chân thành, không ép buộc","Phải giàu có","Phải mạnh mẽ"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Truyện 'Chàng Tiều Phu và Nàng Tiên' thuộc thể loại gì?","opts":["Thần thoại","Cổ tích thần kỳ","Truyền thuyết","Ngụ ngôn"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Nàng Tiên thường từ đâu xuống trần?","opts":["Biển","Thiên đình / cõi tiên","Rừng","Núi"],"ans":1,"difficulty":"easy"},
]

bank["m_dragonking"] = [
  {"id":1,"q":"Long Vương trong tín ngưỡng Việt cai quản gì?","opts":["Núi rừng","Biển cả, sông nước","Trời","Đất"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Rồng trong văn hóa Việt gắn với yếu tố nào?","opts":["Lửa","Nước (sông, biển, mưa)","Đất","Gió"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Thăng Long có nghĩa là gì?","opts":["Rồng đỏ","Rồng bay lên","Rồng vàng","Rồng ngủ"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Ai đặt tên Thăng Long?","opts":["Hùng Vương","An Dương Vương","Lý Thái Tổ (1010)","Trần Nhân Tông"],"ans":2,"difficulty":"medium"},
  {"id":5,"q":"Hình rồng trên áo vua tượng trưng cho gì?","opts":["Sức mạnh quân sự","Quyền lực hoàng gia, thiên mệnh","Sự giàu có","Tình yêu"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Rồng Việt có bao nhiêu móng?","opts":["3","4","5","Tùy thời kỳ (4-5)"],"ans":3,"difficulty":"hard"},
  {"id":7,"q":"Rồng thời Lý có đặc điểm gì?","opts":["To lớn","Mảnh mai, uốn khúc như rắn","Có cánh","Giống hổ"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"'Con Rồng cháu Tiên' gắn với truyền thuyết nào?","opts":["Sơn Tinh Thủy Tinh","Lạc Long Quân và Âu Cơ","Thạch Sanh","Tấm Cám"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Chín rồng (Cửu Long) gắn với vùng nào?","opts":["Miền Bắc","Đồng bằng sông Cửu Long (9 nhánh sông Mekong)","Miền Trung","Tây Nguyên"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Trong phong thủy, rồng đại diện cho gì?","opts":["Xui xẻo","Vượng khí, sinh lực, may mắn","Tai họa","Chiến tranh"],"ans":1,"difficulty":"easy"},
]

bank["m_jade"] = [
  {"id":1,"q":"Ngọc Hoàng Thượng Đế là vị thần nào?","opts":["Thần Đất","Vị thần cao nhất cai quản thiên đình","Thần Biển","Thần Rừng"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Trong tín ngưỡng Việt, Ngọc Hoàng cai quản gì?","opts":["Chỉ biển","Trời đất, vạn vật, phán xét thiện ác","Chỉ mưa gió","Chỉ đất đai"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Ông Táo báo cáo với ai vào 23 tháng Chạp?","opts":["Phật","Ngọc Hoàng","Diêm Vương","Thổ Địa"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Thiên đình trong tín ngưỡng Việt nằm ở đâu?","opts":["Dưới biển","Trên trời cao","Trong lòng đất","Trên núi"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Ngọc Hoàng có bao nhiêu con gái nổi tiếng trong truyền thuyết?","opts":["Không có","Nhiều, trong đó có Liễu Hạnh, Tiên Dung","Chỉ 1","100"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Tín ngưỡng thờ Ngọc Hoàng chịu ảnh hưởng từ đâu?","opts":["Phật giáo","Đạo giáo (Trung Quốc) + bản địa Việt","Hồi giáo","Thiên Chúa giáo"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Ngày vía Ngọc Hoàng là ngày nào?","opts":["Mùng 1 Tết","Mùng 9 tháng Giêng","Rằm tháng 7","Mùng 5 tháng 5"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Thiên Lôi trong truyền thuyết Việt phụ trách gì?","opts":["Mưa","Sấm sét (thừa lệnh Ngọc Hoàng đánh kẻ ác)","Gió","Lũ lụt"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Diêm Vương cai quản gì?","opts":["Thiên đình","Âm phủ (cõi chết)","Biển","Rừng"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Trong truyện cổ Việt, Ngọc Hoàng thường đóng vai trò gì?","opts":["Phản diện","Phân xử công bằng, thưởng phạt","Bàng quan","Gây chiến"],"ans":1,"difficulty":"easy"},
]

bank["m_camrong"] = [
  {"id":1,"q":"'Cậu Bé Rồng' là truyện thuộc thể loại gì?","opts":["Sử thi","Cổ tích dân gian Việt","Tiểu thuyết","Phim hoạt hình"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Hình tượng rồng trong truyện đại diện cho gì?","opts":["Quỷ dữ","Sức mạnh, bảo hộ, nguồn gốc cao quý","Sự lười biếng","Chiến tranh"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Người Việt coi rồng là biểu tượng gì?","opts":["Xui xẻo","May mắn, quyền quý, sức mạnh","Sợ hãi","Ngu dốt"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Con rồng trong văn hóa Việt khác phương Tây ở điểm nào?","opts":["Giống nhau","Rồng VN hiền lành, mang mưa thuận gió hòa; phương Tây hung dữ","Rồng VN có cánh","Rồng VN nhỏ hơn"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Rồng gắn với nghề nào?","opts":["Công nghiệp","Nông nghiệp (cầu mưa, cầu nước)","Du lịch","Thương mại"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Hình rồng xuất hiện trên công trình nào?","opts":["Chợ","Đình, chùa, cung điện","Nhà dân","Trường học"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Rồng Việt thường uốn bao nhiêu khúc?","opts":["3","5","7","12 (theo 12 tháng)"],"ans":3,"difficulty":"hard"},
  {"id":8,"q":"Năm con rồng trong 12 con giáp là gì?","opts":["Năm Thìn","Năm Tỵ","Năm Dần","Năm Mão"],"ans":0,"difficulty":"easy"},
  {"id":9,"q":"Người sinh năm Rồng (Thìn) được cho là gì?","opts":["Xui xẻo","Cao quý, may mắn theo quan niệm dân gian","Bình thường","Vất vả"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Cầu Rồng nổi tiếng ở thành phố nào?","opts":["Hà Nội","Đà Nẵng","Huế","Sài Gòn"],"ans":1,"difficulty":"easy"},
]

bank["m_trongsong"] = [
  {"id":1,"q":"Trống sấm trong truyền thuyết VN tượng trưng cho gì?","opts":["Âm nhạc","Sức mạnh thần thánh, chiến trận","Mưa bão","Lễ hội"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Trống được dùng trong chiến trận để làm gì?","opts":["Giải trí","Chỉ huy, thúc quân, gây thanh thế","Đuổi thú","Báo giờ"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Tiếng trống đồng gắn với thời đại nào?","opts":["Thời nhà Nguyễn","Thời Đông Sơn (Hùng Vương)","Thời Pháp thuộc","Hiện đại"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Trong lễ hội, trống dùng để làm gì?","opts":["Chỉ trang trí","Cầu mưa, cầu mùa, đánh nhịp lễ nghi","Bán hàng","Không dùng"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Truyền thuyết trống sấm phản ánh tín ngưỡng gì?","opts":["Thờ Phật","Thờ thần mưa, thần sấm","Thờ cây","Thờ đá"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Tên gọi khác của sấm sét trong văn hóa Việt?","opts":["Thiên Lôi","Long Vương","Sơn Thần","Hải Thần"],"ans":0,"difficulty":"medium"},
  {"id":7,"q":"Ông Thiên Lôi dùng gì để đánh sấm?","opts":["Búa","Búa và rìu (lưỡi tầm sét)","Gươm","Tay không"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Trong truyện cổ, ai bị sét đánh?","opts":["Người hiền","Kẻ ác (trời trừ)","Mọi người","Không ai"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Sấm sét trong nông nghiệp VN có ý nghĩa gì?","opts":["Xui xẻo","Báo hiệu mùa mưa, giúp cây trồng","Tai họa","Không có ý nghĩa"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Trống đồng khi đánh có âm thanh được ví với gì?","opts":["Tiếng chim","Tiếng sấm (thần linh)","Tiếng gió","Tiếng nước"],"ans":1,"difficulty":"medium"},
]

bank["m_honvong"] = [
  {"id":1,"q":"Hòn Vọng Phu là truyền thuyết về gì?","opts":["Chiến tranh","Người vợ hóa đá chờ chồng","Tình yêu thần tiên","Rồng và tiên"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"'Vọng Phu' có nghĩa là gì?","opts":["Nhìn chồng (trông chồng)","Nhìn trời","Nhìn biển","Nhìn con"],"ans":0,"difficulty":"easy"},
  {"id":3,"q":"Người vợ trong truyền thuyết bế gì trên tay?","opts":["Hoa","Đứa con","Gươm","Giỏ cơm"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Hòn Vọng Phu nổi tiếng ở đâu?","opts":["Hà Nội","Nhiều nơi: Lạng Sơn, Bình Định, Kon Tum,...","Huế","Đà Nẵng"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Truyền thuyết phản ánh phẩm chất gì?","opts":["Sức mạnh","Lòng chung thủy của người phụ nữ Việt","Giàu có","Quyền lực"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Người chồng đi đâu?","opts":["Buôn bán","Đi chiến trận/đi xa","Du học","Đánh cá"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Tại sao người vợ hóa đá?","opts":["Bị trừng phạt","Chờ chồng quá lâu, hóa đá vì thương nhớ","Bị phép thuật","Bệnh nặng"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Hình ảnh Hòn Vọng Phu trong văn học nghệ thuật?","opts":["Rất ít","Rất phổ biến trong thơ, ca, nhạc, họa","Chỉ trong truyện cổ","Không được nhắc đến"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Bài hát 'Hòn Vọng Phu' nổi tiếng do ai sáng tác?","opts":["Trịnh Công Sơn","Lê Thương","Phạm Duy","Văn Cao"],"ans":1,"difficulty":"hard"},
  {"id":10,"q":"Truyền thuyết cho thấy xã hội Việt coi trọng gì?","opts":["Giàu có","Chung thủy, đợi chờ, tình nghĩa vợ chồng","Quyền lực","Chiến tranh"],"ans":1,"difficulty":"easy"},
]

bank["m_cheoleo"] = [
  {"id":1,"q":"Chèo là loại hình nghệ thuật gì?","opts":["Hội họa","Sân khấu dân gian (kịch hát)","Múa rối","Nhạc cụ"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Chèo phổ biến ở vùng nào?","opts":["Miền Nam","Đồng bằng Bắc Bộ","Tây Nguyên","Miền Trung"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Chèo thường diễn ở đâu?","opts":["Nhà hát lớn","Sân đình (chiếu chèo)","Rạp phim","Sân vận động"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Nhân vật nào là biểu tượng của chèo?","opts":["Hoàng tử","Hề chèo (vai hài)","Tướng quân","Thần tiên"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Chèo kết hợp những yếu tố nghệ thuật nào?","opts":["Chỉ hát","Hát, múa, nhạc, diễn kịch, đối thoại","Chỉ múa","Chỉ nhạc"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Vở chèo nổi tiếng nào dựa trên truyện cổ tích?","opts":["Hamlet","Quan Âm Thị Kính, Tấm Cám","Romeo và Juliet","Kiều"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Chèo có lịch sử bao lâu?","opts":["100 năm","Hàng nghìn năm (từ thời Lý-Trần)","50 năm","500 năm"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Sự khác biệt giữa chèo và tuồng?","opts":["Giống nhau","Chèo dân dã (Bắc), tuồng cung đình (Trung)","Chèo mới hơn","Tuồng vui hơn"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Chèo được UNESCO công nhận chưa?","opts":["Chưa","Đang trong danh sách di sản cần bảo vệ","Đã công nhận di sản thế giới","Không liên quan đến UNESCO"],"ans":1,"difficulty":"hard"},
  {"id":10,"q":"Khán giả chèo có thể làm gì đặc biệt?","opts":["Chỉ ngồi xem","Tham gia đối đáp, giao lưu với diễn viên","Không được nói gì","Bỏ về"],"ans":1,"difficulty":"medium"},
]

# ============ More battle events ============

bank["b_trieuhoa"] = [
  {"id":1,"q":"Bà Triệu tên thật là gì?","opts":["Triệu Thị Trinh","Triệu Ẩu","Triệu Thị Trưng","Triệu Thị Dung"],"ans":0,"difficulty":"easy"},
  {"id":2,"q":"Bà Triệu khởi nghĩa năm nào?","opts":["40 SCN","248 SCN","542 SCN","938 SCN"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Bà Triệu chống lại quân nào?","opts":["Nhà Hán","Nhà Ngô (Đông Ngô)","Nhà Tống","Nhà Minh"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Câu nói nổi tiếng của Bà Triệu là gì?","opts":["Sống làm anh hùng","Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ","Không sợ kẻ thù","Chiến đấu tới cùng"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Bà Triệu cưỡi gì ra trận?","opts":["Ngựa","Voi","Thuyền","Xe"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Bà Triệu quê ở đâu?","opts":["Ninh Bình","Thanh Hóa","Hà Nội","Nghệ An"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Bà Triệu hy sinh khi bao nhiêu tuổi?","opts":["19","23","30","40"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Bà Triệu được ví với ai ở Trung Quốc?","opts":["Võ Tắc Thiên","Hoa Mộc Lan","Tây Thi","Dương Quý Phi"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Quân Ngô gọi Bà Triệu bằng danh xưng gì?","opts":["Nữ tướng","Bà tướng cưỡi voi (Lệ Hải Bà Vương)","Nữ hoàng","Công chúa"],"ans":1,"difficulty":"hard"},
  {"id":10,"q":"Ý nghĩa khởi nghĩa Bà Triệu?","opts":["Thành công hoàn toàn","Thể hiện ý chí bất khuất, tinh thần yêu nước","Không có ý nghĩa","Chỉ là địa phương"],"ans":1,"difficulty":"easy"},
]

bank["b_lynam"] = [
  {"id":1,"q":"Lý Bí (Lý Nam Đế) lập nước gì?","opts":["Đại Việt","Vạn Xuân","Âu Lạc","Đại Cồ Việt"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nước Vạn Xuân thành lập năm nào?","opts":["40 SCN","542 SCN","938 SCN","968 SCN"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Lý Bí chống lại quân nào?","opts":["Nhà Hán","Nhà Lương","Nhà Tống","Nhà Minh"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"'Vạn Xuân' có nghĩa là gì?","opts":["Vạn năm","Muôn mùa xuân (đất nước trường tồn)","Vạn chiến thắng","Vạn dân"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Ai kế thừa Lý Bí chống giặc?","opts":["Ngô Quyền","Triệu Quang Phục","Phùng Hưng","Khúc Thừa Dụ"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Triệu Quang Phục chống giặc ở đâu?","opts":["Sông Bạch Đằng","Đầm Dạ Trạch","Cổ Loa","Thăng Long"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Lý Bí xưng hiệu gì?","opts":["Vương","Lý Nam Đế (Hoàng đế)","Tiết độ sứ","Chúa"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Nước Vạn Xuân tồn tại khoảng bao lâu?","opts":["5 năm","Khoảng 60 năm (542-602)","100 năm","200 năm"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Ý nghĩa việc Lý Bí xưng đế?","opts":["Tham quyền","Khẳng định chủ quyền, ngang hàng Trung Quốc","Bắt chước","Không có ý nghĩa"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Thời Vạn Xuân, kinh đô đặt ở đâu?","opts":["Cổ Loa","Long Biên (vùng Hà Nội)","Hoa Lư","Phú Xuân"],"ans":1,"difficulty":"medium"},
]

bank["b_khuchua"] = [
  {"id":1,"q":"Khúc Thừa Dụ tự lập năm nào?","opts":["905","938","968","1009"],"ans":0,"difficulty":"easy"},
  {"id":2,"q":"Khúc Thừa Dụ giữ chức gì khi tự lập?","opts":["Hoàng đế","Tiết độ sứ (tự xưng)","Vương","Chúa"],"ans":1,"difficulty":"medium"},
  {"id":3,"q":"Khúc Thừa Dụ quê ở đâu?","opts":["Ninh Bình","Hải Dương","Thanh Hóa","Hà Nội"],"ans":1,"difficulty":"hard"},
  {"id":4,"q":"Họ Khúc cai trị qua mấy đời?","opts":["1","2","3","4"],"ans":2,"difficulty":"medium"},
  {"id":5,"q":"3 đời họ Khúc gồm ai?","opts":["Khúc Thừa Dụ, Khúc Hạo, Khúc Thừa Mỹ","Khúc Thừa Dụ, Khúc Thừa Mỹ, Khúc Hạo","Chỉ Khúc Thừa Dụ","Khúc Thừa Dụ và 2 người khác"],"ans":0,"difficulty":"hard"},
  {"id":6,"q":"Khúc Hạo nổi tiếng về cải cách gì?","opts":["Quân sự","Hành chính, thuế khóa, nội trị","Giáo dục","Xây dựng"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Họ Khúc tự lập khi nhà nào suy yếu?","opts":["Nhà Hán","Nhà Đường","Nhà Tống","Nhà Minh"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Ý nghĩa của họ Khúc tự lập?","opts":["Không quan trọng","Đặt nền tảng cho độc lập hoàn toàn (trước Ngô Quyền)","Chỉ tạm thời","Thất bại"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Khúc Thừa Mỹ bị ai đánh bại?","opts":["Quân Tống","Quân Nam Hán","Quân Minh","Quân Thanh"],"ans":1,"difficulty":"hard"},
  {"id":10,"q":"Sau khi họ Khúc bị đánh bại, ai nổi lên?","opts":["Đinh Bộ Lĩnh","Dương Đình Nghệ rồi Ngô Quyền","Lý Công Uẩn","Trần Hưng Đạo"],"ans":1,"difficulty":"hard"},
]

bank["b_ledai"] = [
  {"id":1,"q":"Lê Đại Hành (Lê Hoàn) chống quân nào?","opts":["Nam Hán","Nhà Tống","Nhà Minh","Nhà Thanh"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Lê Hoàn đánh Tống năm nào?","opts":["968","981","1009","1076"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Trước khi lên ngôi, Lê Hoàn giữ chức gì?","opts":["Quan văn","Thập đạo tướng quân, phụ chính nhà Đinh","Thái giám","Hoàng tử"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Lê Hoàn lập ra triều đại nào?","opts":["Nhà Đinh","Nhà Tiền Lê","Nhà Hậu Lê","Nhà Lý"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Trận đánh quyết định của Lê Hoàn ở đâu?","opts":["Sông Bạch Đằng","Chi Lăng","Sông Đà","Sông Như Nguyệt"],"ans":0,"difficulty":"medium"},
  {"id":6,"q":"Ngoài chống Tống, Lê Hoàn còn chinh phạt nước nào?","opts":["Lào","Chiêm Thành","Khmer","Miến Điện"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Thái hậu Dương Vân Nga có vai trò gì?","opts":["Không liên quan","Khoác áo bào lên Lê Hoàn, ủng hộ lên ngôi","Chống đối","Bỏ chạy"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Nhà Tiền Lê tồn tại bao lâu?","opts":["10 năm","Khoảng 29 năm (980-1009)","50 năm","100 năm"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Sau nhà Tiền Lê, triều đại nào lên thay?","opts":["Nhà Trần","Nhà Lý","Nhà Đinh","Nhà Hậu Lê"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Chiến thắng Tống năm 981 có ý nghĩa gì?","opts":["Mở rộng lãnh thổ","Bảo vệ nền độc lập non trẻ","Không quan trọng","Chỉ là phòng thủ"],"ans":1,"difficulty":"easy"},
]

bank["b_ngoquyen2"] = [
  {"id":1,"q":"Ngô Quyền nổi tiếng nhất với chiến thuật gì?","opts":["Hỏa công","Cọc gỗ bọc sắt cắm dưới lòng sông","Vây thành","Dùng voi"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Chiến thuật cọc Bạch Đằng lợi dụng gì?","opts":["Gió bão","Thủy triều lên xuống","Sương mù","Mưa lũ"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Ngô Quyền học chiến thuật cọc từ đâu?","opts":["Trung Quốc","Không ai dạy, tự nghĩ ra / dựa vào địa thế sông","Cha dạy","Sách binh pháp"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Bước 1 của chiến thuật: Ngô Quyền làm gì?","opts":["Tấn công trước","Giả thua, dụ địch vào khi triều lên","Phục kích","Đầu hàng giả"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Bước 2: Khi triều rút thì sao?","opts":["Không gì xảy ra","Cọc nhọn nhô lên đâm thuyền, quân ta phản công","Quân ta rút","Ngừng chiến"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Sông Bạch Đằng nổi tiếng với bao nhiêu trận đánh?","opts":["1","2","3 (938, 981, 1288)","4"],"ans":2,"difficulty":"medium"},
  {"id":7,"q":"Ai đã dùng lại chiến thuật cọc ở Bạch Đằng năm 1288?","opts":["Lý Thường Kiệt","Trần Hưng Đạo","Lê Lợi","Nguyễn Huệ"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Lý do sông Bạch Đằng phù hợp đánh thủy chiến?","opts":["Nước nông","Thủy triều chênh lệch lớn, lòng sông hẹp","Nước sâu","Không có gì đặc biệt"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Cọc bọc sắt nhằm mục đích gì?","opts":["Trang trí","Đâm thủng đáy thuyền địch khi triều rút","Làm đê","Làm cầu"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Chiến thuật thủy chiến của Ngô Quyền ảnh hưởng đến ai?","opts":["Chỉ 1 trận","Nhiều thế hệ tướng lĩnh VN sau này","Không ai","Chỉ Trung Quốc"],"ans":1,"difficulty":"easy"},
]

bank["b_trandao"] = [
  {"id":1,"q":"Trận Đông Bộ Đầu diễn ra năm nào?","opts":["1258","1285","1288","1300"],"ans":0,"difficulty":"easy"},
  {"id":2,"q":"Quân Mông Cổ xâm lược Đại Việt lần đầu dưới thời vua nào?","opts":["Trần Thái Tông","Trần Nhân Tông","Trần Anh Tông","Trần Thánh Tông"],"ans":0,"difficulty":"medium"},
  {"id":3,"q":"Thái sư nào đóng vai trò quan trọng trong kháng chiến lần 1?","opts":["Trần Hưng Đạo","Trần Thủ Độ","Trần Quang Khải","Trần Khánh Dư"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Câu nói nổi tiếng của Trần Thủ Độ là gì?","opts":["Không đầu hàng","Đầu thần chưa rơi xin bệ hạ đừng lo","Quyết chiến","Sống mái với giặc"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Quân Mông Cổ chiếm Thăng Long nhưng kết quả sao?","opts":["Giữ được","Bỏ trống vì dân theo chiến lược vườn không nhà trống","Xây thêm thành","Ở lại lâu dài"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Chiến lược 'vườn không nhà trống' nghĩa là gì?","opts":["Trồng rau","Rút lui, cất giấu lương thực, để địch thiếu ăn","Xây vườn","Đốt nhà"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Quân Đại Việt phản công ở đâu?","opts":["Cổ Loa","Đông Bộ Đầu (vùng Hà Nội)","Hải Phòng","Thanh Hóa"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Kết quả kháng chiến lần 1?","opts":["Thua","Đại Việt chiến thắng, Mông Cổ rút lui","Hòa","Đầu hàng"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Quân Mông Cổ nổi tiếng vì điều gì?","opts":["Yếu","Kỵ binh mạnh nhất thế giới, chinh phục nhiều nước","Hải quân mạnh","Giỏi phòng thủ"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Đại Việt là một trong ít nước nào đánh bại Mông Cổ?","opts":["Mông Cổ chưa thua ai","Đại Việt, Nhật Bản, Ai Cập (Mamluk)","Chỉ Đại Việt","Không nước nào thắng"],"ans":1,"difficulty":"hard"},
]

bank["b_hatitran"] = [
  {"id":1,"q":"Hội nghị Diên Hồng diễn ra năm nào?","opts":["1258","1284","1288","1300"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Ai triệu tập Hội nghị Diên Hồng?","opts":["Trần Hưng Đạo","Vua Trần Nhân Tông","Trần Thủ Độ","Trần Quang Khải"],"ans":1,"difficulty":"medium"},
  {"id":3,"q":"Hội nghị hỏi ý kiến ai?","opts":["Chỉ quan lại","Bô lão (đại diện nhân dân cả nước)","Chỉ tướng sĩ","Chỉ hoàng gia"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Câu trả lời đồng thanh tại Diên Hồng là gì?","opts":["Hòa","Đánh! (Quyết đánh!)","Chạy","Thương lượng"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Hội nghị Diên Hồng nhằm chống ai?","opts":["Nhà Tống","Quân Nguyên Mông (lần 2)","Nhà Minh","Chiêm Thành"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Hội nghị Diên Hồng có ý nghĩa gì?","opts":["Hình thức","Thể hiện ý chí toàn dân quyết tâm kháng chiến","Chỉ tham khảo","Không quan trọng"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Trước trận chiến lần 2, ai viết Hịch Tướng Sĩ?","opts":["Trần Nhân Tông","Trần Hưng Đạo (Trần Quốc Tuấn)","Nguyễn Trãi","Lý Thường Kiệt"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Hịch Tướng Sĩ nhằm mục đích gì?","opts":["Xin hàng","Khích lệ tinh thần chiến đấu của tướng sĩ","Tuyên bố hòa bình","Mô tả lịch sử"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Quân Nguyên Mông xâm lược Đại Việt mấy lần?","opts":["1","2","3","4"],"ans":2,"difficulty":"medium"},
  {"id":10,"q":"Trần Hưng Đạo nổi tiếng với câu nói nào?","opts":["Đánh hay hòa","Bệ hạ muốn hàng, hãy chém đầu thần trước","Tiến lên","Không sợ"],"ans":1,"difficulty":"medium"},
]

bank["b_chilang"] = [
  {"id":1,"q":"Trận Chi Lăng – Xương Giang diễn ra năm nào?","opts":["1418","1423","1427","1428"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Ai chỉ huy quân Lam Sơn tại Chi Lăng?","opts":["Lê Lợi","Nguyễn Trãi","Tướng Lê Sát, Lưu Nhân Chú","Trần Hưng Đạo"],"ans":2,"difficulty":"hard"},
  {"id":3,"q":"Quân Minh tại Chi Lăng do ai chỉ huy?","opts":["Trương Phụ","Liễu Thăng","Vương Thông","Mộc Thạnh"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Liễu Thăng kết cục thế nào?","opts":["Trốn về","Bị giết tại Chi Lăng","Đầu hàng","Bị bắt sống"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Ải Chi Lăng nằm ở đâu?","opts":["Thanh Hóa","Lạng Sơn","Hà Nội","Quảng Ninh"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Chiến thắng Chi Lăng – Xương Giang dẫn đến kết quả gì?","opts":["Tiếp tục chiến tranh","Quân Minh đầu hàng, Đại Việt độc lập","Hòa hoãn","Bế tắc"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Xương Giang nay thuộc tỉnh nào?","opts":["Lạng Sơn","Bắc Giang","Bắc Ninh","Thái Nguyên"],"ans":1,"difficulty":"hard"},
  {"id":8,"q":"Quân Lam Sơn dùng chiến thuật gì ở Chi Lăng?","opts":["Tấn công trực diện","Phục kích trong ải hẹp","Thủy chiến","Vây thành"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Vương Thông ở Đông Quan (Hà Nội) phải làm gì?","opts":["Chiến đấu tiếp","Xin hòa, chấp nhận rút quân về nước","Tự vẫn","Đầu hàng vô điều kiện"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Sau Chi Lăng – Xương Giang, Nguyễn Trãi viết gì?","opts":["Hịch","Bình Ngô Đại Cáo","Chiếu dời đô","Nam quốc sơn hà"],"ans":1,"difficulty":"easy"},
]

bank["b_lamson"] = [
  {"id":1,"q":"Khởi nghĩa Lam Sơn do ai lãnh đạo?","opts":["Trần Hưng Đạo","Lê Lợi","Nguyễn Huệ","Quang Trung"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Khởi nghĩa Lam Sơn bắt đầu năm nào?","opts":["1400","1418","1427","1428"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Lê Lợi chống lại quân xâm lược nào?","opts":["Nhà Tống","Nhà Nguyên","Nhà Minh","Nhà Thanh"],"ans":2,"difficulty":"easy"},
  {"id":4,"q":"Mưu sĩ giúp Lê Lợi là ai?","opts":["Trần Hưng Đạo","Nguyễn Trãi","Lý Thường Kiệt","Phan Bội Châu"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Lam Sơn ở đâu?","opts":["Hà Nội","Thanh Hóa","Nghệ An","Ninh Bình"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Bình Ngô Đại Cáo ra đời năm nào?","opts":["1418","1426","1427","1428"],"ans":3,"difficulty":"medium"},
  {"id":7,"q":"Bình Ngô Đại Cáo do ai viết?","opts":["Lê Lợi","Nguyễn Trãi","Trần Hưng Đạo","Lý Thường Kiệt"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"'Bình Ngô' có nghĩa là gì?","opts":["Hòa bình","Đánh dẹp giặc Ngô (giặc Minh)","Bình yên","Chiến thắng"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Sau khi thắng lợi, Lê Lợi lập ra triều đại nào?","opts":["Nhà Trần","Nhà Lê (Lê Sơ)","Nhà Lý","Nhà Nguyễn"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Gươm thần trong truyền thuyết liên quan đến Lê Lợi được trả cho ai?","opts":["Ngọc Hoàng","Rùa Vàng (tại Hồ Hoàn Kiếm)","Sơn Tinh","Thủy Tinh"],"ans":1,"difficulty":"easy"},
]

# ============ Dynasty events ============

bank["dinh968"] = [
  {"id":1,"q":"Đinh Bộ Lĩnh thống nhất đất nước năm nào?","opts":["938","968","981","1009"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Quốc hiệu Đại Cồ Việt do ai đặt?","opts":["Ngô Quyền","Đinh Tiên Hoàng (Đinh Bộ Lĩnh)","Lý Thái Tổ","Lê Hoàn"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Kinh đô Hoa Lư thuộc tỉnh nào ngày nay?","opts":["Hà Nội","Ninh Bình","Thanh Hóa","Nam Định"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Đinh Bộ Lĩnh dẹp bao nhiêu sứ quân?","opts":["8","10","12","15"],"ans":2,"difficulty":"easy"},
  {"id":5,"q":"Nhà Đinh là triều đại phong kiến đầu tiên sau thời kỳ gì?","opts":["Bắc thuộc","Loạn 12 sứ quân","Nhà Ngô","Tất cả đều đúng"],"ans":3,"difficulty":"medium"},
  {"id":6,"q":"Đinh Tiên Hoàng dùng hình phạt gì để răn đe?","opts":["Phạt tiền","Vạc dầu, chuồng hổ","Đày đi xa","Giam giữ"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Đinh Tiên Hoàng bị ai giết?","opts":["Quân Tống","Đỗ Thích (hoạn quan)","Lê Hoàn","Dân chúng"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Sau cái chết Đinh Tiên Hoàng, con trai là Đinh Toàn bao nhiêu tuổi?","opts":["3 tuổi","6 tuổi","10 tuổi","15 tuổi"],"ans":1,"difficulty":"hard"},
  {"id":9,"q":"Ai nhiếp chính cho Đinh Toàn?","opts":["Dương Vân Nga","Lê Hoàn (phụ chính)","Ngô Quyền","Đinh Liễn"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Ý nghĩa nhà Đinh trong lịch sử?","opts":["Không quan trọng","Thống nhất, lập triều đại phong kiến trung ương tập quyền đầu tiên","Chỉ tạm thời","Sao chép Trung Quốc"],"ans":1,"difficulty":"easy"},
]

bank["ly1009"] = [
  {"id":1,"q":"Nhà Lý do ai sáng lập?","opts":["Lý Thường Kiệt","Lý Công Uẩn (Lý Thái Tổ)","Lý Thái Tông","Lý Bí"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nhà Lý thành lập năm nào?","opts":["968","981","1009","1225"],"ans":2,"difficulty":"easy"},
  {"id":3,"q":"Lý Thái Tổ dời đô từ đâu về đâu?","opts":["Cổ Loa → Thăng Long","Hoa Lư → Thăng Long","Phong Châu → Hoa Lư","Thăng Long → Huế"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Chiếu dời đô được viết năm nào?","opts":["1009","1010","1042","1076"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Tại sao Lý Thái Tổ dời đô?","opts":["Hoa Lư quá nhỏ","Thăng Long ở vị trí trung tâm, thuận lợi phát triển","Bị ép buộc","Để gần biên giới"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Nhà Lý tồn tại bao lâu?","opts":["100 năm","Khoảng 216 năm (1009-1225)","300 năm","50 năm"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Phật giáo phát triển mạnh nhất thời nào?","opts":["Nhà Đinh","Nhà Lý","Nhà Nguyễn","Nhà Lê"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Quốc Tử Giám thành lập năm nào?","opts":["1070","1076","1225","1428"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Văn Miếu - Quốc Tử Giám ở đâu?","opts":["Hà Nội","Huế","Ninh Bình","Thanh Hóa"],"ans":0,"difficulty":"easy"},
  {"id":10,"q":"Văn Miếu được xây để thờ ai?","opts":["Phật","Khổng Tử (Nho giáo)","Lão Tử","Lý Thái Tổ"],"ans":1,"difficulty":"medium"},
]

bank["tran1226"] = [
  {"id":1,"q":"Nhà Trần thay thế nhà Lý năm nào?","opts":["1009","1225 (hoặc 1226)","1288","1400"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nhà Trần 3 lần đánh bại quân nào?","opts":["Nhà Tống","Nguyên Mông","Nhà Minh","Nhà Thanh"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Trần Hưng Đạo tên thật là gì?","opts":["Trần Quốc Toản","Trần Quốc Tuấn","Trần Thủ Độ","Trần Nhân Tông"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Trận Bạch Đằng lần 3 năm nào?","opts":["938","981","1288","1427"],"ans":2,"difficulty":"easy"},
  {"id":5,"q":"3 lần kháng Nguyên Mông vào các năm nào?","opts":["1250, 1260, 1270","1258, 1285, 1287-1288","1300, 1310, 1320","1200, 1250, 1300"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Hội nghị Bình Than nhằm mục đích gì?","opts":["Cúng tế","Bàn kế chống giặc","Lập vua mới","Xây cung điện"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Trần Quốc Toản nổi tiếng vì điều gì?","opts":["Giỏi văn","Bóp nát quả cam vì không được dự bàn đánh giặc (còn nhỏ tuổi)","Giỏi võ nhất","Làm vua"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Nhà Trần kết thúc vì ai cướp ngôi?","opts":["Lê Lợi","Hồ Quý Ly","Trần Hưng Đạo","Nguyễn Ánh"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Nhà Trần tồn tại bao lâu?","opts":["50 năm","100 năm","Khoảng 175 năm (1225-1400)","200 năm"],"ans":2,"difficulty":"medium"},
  {"id":10,"q":"Đặc sắc nào trong quân sự nhà Trần?","opts":["Dùng voi","Toàn dân đánh giặc, thích chữ 'Sát Thát' vào tay","Dùng súng","Dùng máy bay"],"ans":1,"difficulty":"easy"},
]

bank["le1428"] = [
  {"id":1,"q":"Nhà Lê Sơ do ai sáng lập?","opts":["Lê Hoàn","Lê Lợi (Lê Thái Tổ)","Lê Thánh Tông","Lê Chiêu Thống"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nhà Lê thành lập sau khi đánh bại quân nào?","opts":["Nguyên Mông","Nhà Minh","Nhà Tống","Nhà Thanh"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Bình Ngô Đại Cáo được coi là gì?","opts":["Chiếu dời đô","Bản tuyên ngôn độc lập thứ hai","Hịch tướng sĩ","Thư xin hàng"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Vua nào nhà Lê được coi là minh quân nhất?","opts":["Lê Thái Tổ","Lê Thánh Tông","Lê Nhân Tông","Lê Thái Tông"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Bộ luật Hồng Đức do ai ban hành?","opts":["Lê Lợi","Lê Thánh Tông","Nguyễn Trãi","Trần Nhân Tông"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Luật Hồng Đức có đặc điểm gì tiến bộ?","opts":["Rất hà khắc","Bảo vệ quyền phụ nữ, người yếu thế","Sao chép Trung Quốc","Chỉ cho quan lại"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Thời Lê Thánh Tông, giáo dục phát triển với kỳ thi gì?","opts":["Thi hương","Thi Đình (cao nhất, chọn Trạng Nguyên)","Thi vào lớp","Thi thể lực"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Nhà Lê Sơ tồn tại đến năm nào?","opts":["1428","1527","1788","1802"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Ai cướp ngôi nhà Lê, lập nhà Mạc?","opts":["Trịnh Kiểm","Mạc Đăng Dung","Nguyễn Kim","Hồ Quý Ly"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Quốc hiệu thời Lê Sơ là gì?","opts":["Đại Cồ Việt","Đại Việt","Đại Nam","Việt Nam"],"ans":1,"difficulty":"easy"},
]

bank["d_tienle"] = [
  {"id":1,"q":"Nhà Tiền Lê do ai sáng lập?","opts":["Lê Lợi","Lê Hoàn (Lê Đại Hành)","Lê Thánh Tông","Lê Long Đĩnh"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Nhà Tiền Lê thành lập năm nào?","opts":["968","980","1009","1225"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Lê Hoàn đánh bại quân nào ngay khi lên ngôi?","opts":["Nam Hán","Nhà Tống","Nhà Minh","Chiêm Thành"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Kinh đô nhà Tiền Lê ở đâu?","opts":["Thăng Long","Hoa Lư","Cổ Loa","Phú Xuân"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Nhà Tiền Lê tồn tại bao lâu?","opts":["Khoảng 29 năm","50 năm","100 năm","200 năm"],"ans":0,"difficulty":"medium"},
  {"id":6,"q":"Vua cuối cùng nhà Tiền Lê là ai?","opts":["Lê Hoàn","Lê Long Đĩnh (Lê Ngọa Triều)","Lê Trung Tông","Lê Long Việt"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Lê Long Đĩnh nổi tiếng vì gì?","opts":["Tài giỏi","Bạo ngược, tàn ác","Nhân từ","Giỏi văn chương"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Sau nhà Tiền Lê, ai lên ngôi?","opts":["Đinh Tiên Hoàng","Lý Công Uẩn (nhà Lý)","Trần Cảnh","Lê Lợi"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Lê Hoàn có công gì ngoài đánh Tống?","opts":["Xây thành","Mở đường giao thông, chinh phạt Chiêm Thành","Viết sách","Dời đô"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Trận Chi Lăng năm 981 giống trận nào trước đó?","opts":["Trận Đông Bộ Đầu","Trận Bạch Đằng (cũng dùng sông, cọc)","Trận Như Nguyệt","Trận Rạch Gầm"],"ans":1,"difficulty":"hard"},
]

bank["d_macmac"] = [
  {"id":1,"q":"Mạc Đăng Dung cướp ngôi nhà Lê năm nào?","opts":["1428","1527","1592","1788"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Thời kỳ Nam Bắc triều có nghĩa gì?","opts":["2 nước riêng biệt","Nhà Mạc ở Bắc, Lê-Trịnh ở Nam","Chiến tranh Bắc-Nam hiện đại","Nội chiến ngắn"],"ans":1,"difficulty":"medium"},
  {"id":3,"q":"Nhà Mạc tồn tại đến năm nào?","opts":["1527","1592","1677","1802"],"ans":2,"difficulty":"hard"},
  {"id":4,"q":"Nhà Lê được ai giúp phục hưng?","opts":["Nguyễn Kim (sau đó là Trịnh Kiểm)","Nguyễn Huệ","Lý Công Uẩn","Trần Hưng Đạo"],"ans":0,"difficulty":"medium"},
  {"id":5,"q":"Thời Trịnh - Nguyễn phân tranh là gì?","opts":["Chiến tranh với nước ngoài","Chúa Trịnh ở Bắc, Chúa Nguyễn ở Nam chia đất","Hòa bình","Thống nhất"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Ranh giới Trịnh-Nguyễn ở đâu?","opts":["Sông Hồng","Sông Gianh (Quảng Bình)","Sông Mã","Sông Bến Hải"],"ans":1,"difficulty":"medium"},
  {"id":7,"q":"Thời Trịnh-Nguyễn, vua Lê có quyền lực thật không?","opts":["Có, rất mạnh","Không, chỉ làm bù nhìn","Có một nửa","Tự chọn"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Ai chấm dứt cả Trịnh lẫn Nguyễn?","opts":["Nhà Minh","Phong trào Tây Sơn (Nguyễn Huệ)","Nhà Thanh","Pháp"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Chúa Nguyễn mở rộng lãnh thổ về phía nào?","opts":["Bắc","Nam (khai phá miền Nam, Đồng bằng sông Cửu Long)","Đông","Tây"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Thời kỳ phân tranh kéo dài khoảng bao lâu?","opts":["50 năm","Khoảng 200 năm","300 năm","10 năm"],"ans":1,"difficulty":"medium"},
]

# ============================================================
# ADDITIONAL MYTH QUESTIONS
# ============================================================

bank["m_tamcam"] = [
  {"id":1,"q":"Tấm bị mẹ kế và Cám bắt làm gì?","opts":["Đi học","Chăn trâu, bắt tôm tép, chăm vườn","Nấu cơm cho vua","Đi buôn"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Tấm được ai giúp đỡ?","opts":["Ngọc Hoàng","Bụt","Rùa Vàng","Sơn Tinh"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Tấm hóa thân bao nhiêu lần sau khi bị giết?","opts":["1","2","3","4"],"ans":3,"difficulty":"medium"},
  {"id":4,"q":"Tấm hóa thành con gì đầu tiên?","opts":["Con cá","Chim Vàng Anh","Con bướm","Con rồng"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Tấm cuối cùng ẩn trong quả gì?","opts":["Quả đào","Quả thị","Quả lựu","Quả cam"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Ai đã nuôi Tấm từ quả thị?","opts":["Vua","Bà lão nghèo","Phú ông","Cám"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Truyện Tấm Cám ca ngợi gì?","opts":["Sức mạnh","Cái thiện chiến thắng cái ác","Giàu có","Trí tuệ"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Cám là ai?","opts":["Em gái cùng mẹ với Tấm","Con riêng của mẹ kế, em cùng cha khác mẹ","Bạn thân","Người hầu"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Tấm đi thử giày ở đâu?","opts":["Trong cung","Hội chùa","Chợ","Đền thờ"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Chiếc giày của Tấm có đặc biệt gì?","opts":["Bằng vàng","Nhỏ xíu, chỉ vừa chân Tấm","Biết bay","Phát sáng"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Mẹ kế giết Tấm bằng cách nào lần đầu?","opts":["Đầu độc","Bảo Tấm trèo cây rồi chặt gốc","Đẩy xuống sông","Nhốt trong nhà"],"ans":1,"difficulty":"medium"},
  {"id":12,"q":"Cây xoan đào mọc từ đâu?","opts":["Hạt giống thần","Chỗ chôn chim Vàng Anh","Từ trời rơi xuống","Bụt trồng"],"ans":1,"difficulty":"hard"},
  {"id":13,"q":"Truyện Tấm Cám tương tự truyện nào của phương Tây?","opts":["Bạch Tuyết","Lọ Lem (Cinderella)","Công chúa ngủ trong rừng","Cô bé quàng khăn đỏ"],"ans":1,"difficulty":"easy"},
  {"id":14,"q":"Cuối truyện, Cám bị trừng phạt như thế nào?","opts":["Bỏ tù","Bị Tấm trừng phạt, chết","Bị đuổi khỏi cung","Tha bổng"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Con cá bống trong truyện có vai trò gì?","opts":["Cá thần do Bụt ban","Cá bình thường","Cá rồng","Cá tiên"],"ans":0,"difficulty":"medium"},
  {"id":16,"q":"Mẹ kế giết cá bống rồi Tấm làm gì?","opts":["Khóc","Bụt bảo nhặt xương cá chôn vào bốn cái lọ","Bỏ đi","Trả thù"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Xương cá bống biến thành gì?","opts":["Quần áo đẹp và giày để Tấm đi hội","Vàng bạc","Vũ khí","Ngựa"],"ans":0,"difficulty":"medium"},
  {"id":18,"q":"Vua nhận ra Tấm nhờ dấu hiệu gì?","opts":["Giọng nói","Miếng trầu têm cánh phượng","Gương mặt","Chiếc nhẫn"],"ans":1,"difficulty":"hard"},
  {"id":19,"q":"Truyện Tấm Cám phản ánh quan niệm gì?","opts":["Giàu nghèo","Ở hiền gặp lành, ác giả ác báo","Tình yêu","Chiến tranh"],"ans":1,"difficulty":"easy"},
  {"id":20,"q":"Tấm Cám là loại truyện gì?","opts":["Thần thoại","Cổ tích (truyện cổ tích thần kỳ)","Truyền thuyết","Ngụ ngôn"],"ans":1,"difficulty":"easy"},
]

bank["m_thachsamh"] = [
  {"id":1,"q":"Thạch Sanh là con trai đầu thai của ai?","opts":["Ngọc Hoàng","Thái tử trên thiên đình","Lạc Long Quân","Sơn Tinh"],"ans":1,"difficulty":"medium"},
  {"id":2,"q":"Lý Thông có quan hệ gì với Thạch Sanh?","opts":["Anh em kết nghĩa","Anh em ruột","Bạn thân","Kẻ thù"],"ans":0,"difficulty":"easy"},
  {"id":3,"q":"Thạch Sanh chém xà tinh bằng vũ khí gì?","opts":["Gươm thần","Búa rìu được thần dạy","Tay không","Cung tên"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Lý Thông lừa Thạch Sanh đi đâu?","opts":["Hang xà tinh (thay mình canh miếu)","Chiến trận","Ra biển","Lên núi"],"ans":0,"difficulty":"easy"},
  {"id":5,"q":"Sau khi chém xà tinh, ai nhận công?","opts":["Thạch Sanh","Lý Thông (cướp công)","Vua","Thần linh"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Thạch Sanh cứu công chúa từ đâu?","opts":["Hang đại bàng dưới đáy giếng","Núi cao","Biển sâu","Rừng rậm"],"ans":0,"difficulty":"medium"},
  {"id":7,"q":"Vũ khí đặc biệt nhất của Thạch Sanh là gì?","opts":["Gươm","Cây đàn thần","Nỏ","Cung tên"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Tiếng đàn thần có sức mạnh gì?","opts":["Chữa bệnh","Đánh bại 18 nước chư hầu","Gọi mưa","Biến đá thành vàng"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Niêu cơm thần của Thạch Sanh có gì đặc biệt?","opts":["Ăn không hết, cứ vơi lại đầy","Biến thành vàng","Chữa bệnh","Bay được"],"ans":0,"difficulty":"easy"},
  {"id":10,"q":"Thạch Sanh đánh bại 18 nước chư hầu bằng gì?","opts":["Quân đội","Tiếng đàn thần và niêu cơm thần","Vũ khí","Phép thuật"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Kết quả của Lý Thông trong truyện?","opts":["Được thưởng","Bị sét đánh chết, hóa thành bọ hung","Bị đuổi","Được tha"],"ans":1,"difficulty":"medium"},
  {"id":12,"q":"Thạch Sanh cuối cùng trở thành gì?","opts":["Tướng quân","Vua (lấy công chúa, nối ngôi)","Thần tiên","Nông dân"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Truyện Thạch Sanh ca ngợi phẩm chất gì?","opts":["Giàu có","Dũng cảm, thật thà, nhân hậu","Mưu trí","Quyền lực"],"ans":1,"difficulty":"easy"},
  {"id":14,"q":"Con đại bàng trong truyện làm gì?","opts":["Giúp Thạch Sanh","Bắt cóc công chúa","Canh giữ kho báu","Đưa tin"],"ans":1,"difficulty":"easy"},
  {"id":15,"q":"Thạch Sanh sống ở đâu trước khi gặp Lý Thông?","opts":["Trong cung","Dưới gốc đa","Trên núi","Trong hang"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Mẹ Thạch Sanh mang thai bao lâu?","opts":["9 tháng","12 tháng","3 năm","Nhiều năm"],"ans":3,"difficulty":"hard"},
  {"id":17,"q":"Thạch Sanh được ai dạy võ nghệ?","opts":["Cha đẻ","Tiên ông trên trời xuống dạy","Lý Thông","Tự học"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Lý Thông đại diện cho loại người nào?","opts":["Anh hùng","Gian xảo, tham lam, cướp công","Hiền lành","Thông minh"],"ans":1,"difficulty":"easy"},
  {"id":19,"q":"Truyện Thạch Sanh thuộc thể loại gì?","opts":["Thần thoại","Cổ tích thần kỳ","Truyền thuyết","Ngụ ngôn"],"ans":1,"difficulty":"easy"},
  {"id":20,"q":"Bài học chính từ truyện Thạch Sanh?","opts":["Phải khôn ngoan","Ở hiền gặp lành, gian ác bị trừng phạt","Phải giàu có","Phải có quyền lực"],"ans":1,"difficulty":"easy"},
]

# Battle events with partial sets
bank["b_trungvu"] = [
  {"id":1,"q":"Thi Sách là chồng của ai?","opts":["Trưng Nhị","Trưng Trắc","Bà Triệu","Tiên Dung"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Khởi nghĩa Hai Bà Trưng bùng phát ở đâu?","opts":["Hoa Lư","Mê Linh","Cổ Loa","Thăng Long"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Hai Bà Trưng cầm quyền được bao nhiêu năm?","opts":["1 năm","3 năm","5 năm","10 năm"],"ans":1,"difficulty":"medium"},
  {"id":4,"q":"Thi Sách bị ai giết?","opts":["Triệu Đà","Tô Định","Mã Viện","Lý Bí"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Hai Bà Trưng xưng gì sau khi thắng lợi?","opts":["Hoàng đế","Trưng Nữ Vương","Hoàng hậu","Công chúa"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Cuộc khởi nghĩa kết thúc năm nào?","opts":["40 SCN","41 SCN","43 SCN","45 SCN"],"ans":2,"difficulty":"medium"},
  {"id":7,"q":"Có bao nhiêu nữ tướng tham gia khởi nghĩa?","opts":["2","Hàng chục","Hàng trăm","Hàng nghìn"],"ans":1,"difficulty":"medium"},
  {"id":8,"q":"Hai Bà Trưng cưỡi gì ra trận?","opts":["Ngựa","Voi","Xe","Thuyền"],"ans":1,"difficulty":"easy"},
  {"id":9,"q":"Khởi nghĩa phản ánh truyền thống gì của phụ nữ Việt?","opts":["Nội trợ","Anh hùng, yêu nước","Buôn bán giỏi","Nghệ thuật"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Sông Hát, nơi Hai Bà hy sinh, nay ở đâu?","opts":["Hà Nội","Thanh Hóa","Ninh Bình","Nam Định"],"ans":0,"difficulty":"hard"},
  {"id":11,"q":"Lý do chính Trưng Trắc khởi nghĩa?","opts":["Muốn quyền lực","Chồng bị giết + ách đô hộ tàn bạo","Bị ép buộc","Theo truyền thuyết"],"ans":1,"difficulty":"easy"},
  {"id":12,"q":"Hai Bà Trưng đánh chiếm thành Luy Lâu của ai?","opts":["Tô Định","Mã Viện","Triệu Đà","Nhà Lương"],"ans":0,"difficulty":"medium"},
  {"id":13,"q":"Tô Định chạy về đâu khi thua?","opts":["Trung Quốc","Ở lại đầu hàng","Sang Lào","Ra đảo"],"ans":0,"difficulty":"medium"},
  {"id":14,"q":"Mã Viện mang theo bao nhiêu quân?","opts":["1 vạn","2 vạn","5 vạn","10 vạn"],"ans":1,"difficulty":"hard"},
  {"id":15,"q":"Mã Viện dựng cột đồng ở đâu?","opts":["Mê Linh","Biên giới Giao Chỉ","Thăng Long","Cổ Loa"],"ans":1,"difficulty":"hard"},
  {"id":16,"q":"Đền thờ Hai Bà Trưng ở Hà Nội nằm ở đâu?","opts":["Phố Đồng Nhân, quận Hai Bà Trưng","Phố Hàng Bài","Ba Đình","Hoàn Kiếm"],"ans":0,"difficulty":"hard"},
  {"id":17,"q":"Hai Bà Trưng mất khi bao nhiêu tuổi (ước tính)?","opts":["20-25","25-30","30-35","Trên 40"],"ans":0,"difficulty":"hard"},
  {"id":18,"q":"Vùng đất nào KHÔNG nằm trong lãnh thổ Hai Bà Trưng chiếm?","opts":["Quảng Đông (TQ)","Mê Linh","Cửu Chân","Nhật Nam"],"ans":0,"difficulty":"hard"},
  {"id":19,"q":"Ngày kỷ niệm khởi nghĩa Hai Bà Trưng?","opts":["Mùng 6 tháng 2 âm lịch","Mùng 10 tháng 3","Mùng 1 Tết","Rằm tháng 8"],"ans":0,"difficulty":"hard"},
  {"id":20,"q":"Ý nghĩa lịch sử lớn nhất của khởi nghĩa Hai Bà Trưng?","opts":["Giành độc lập lâu dài","Chứng minh ý chí quật cường dân tộc, khởi đầu truyền thống chống ngoại xâm","Mở rộng lãnh thổ","Xây dựng kinh tế"],"ans":1,"difficulty":"medium"},
]

bank["b_lythuong"] = [
  {"id":1,"q":"Lý Thường Kiệt đọc 'Nam quốc sơn hà' ở đâu?","opts":["Thành Thăng Long","Sông Bạch Đằng","Phòng tuyến sông Như Nguyệt","Ải Chi Lăng"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Quân Tống xâm lược năm nào?","opts":["1057","1067","1076","1077"],"ans":2,"difficulty":"medium"},
  {"id":3,"q":"'Nam quốc sơn hà' được coi là gì?","opts":["Chiếu cầu hiền","Bản tuyên ngôn độc lập đầu tiên","Hịch tướng sĩ","Thư gửi quân thù"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Sông Như Nguyệt ngày nay là sông gì?","opts":["Sông Hồng","Sông Cầu","Sông Đà","Sông Mã"],"ans":1,"difficulty":"medium"},
  {"id":5,"q":"Lý Thường Kiệt đánh Tống bằng chiến thuật gì đặc biệt?","opts":["Phòng thủ thụ động","Tiên phát chế nhân (đánh trước)","Đầu hàng giả","Cầu hòa"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Lý Thường Kiệt tấn công vào đất Tống trước khi Tống xâm lược?","opts":["Đúng","Sai","Chỉ phòng thủ","Không rõ"],"ans":0,"difficulty":"medium"},
  {"id":7,"q":"Lý Thường Kiệt sống trong triều đại nào?","opts":["Nhà Đinh","Nhà Lý","Nhà Trần","Nhà Lê"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Quân Tống bao nhiêu vạn tấn công Đại Việt?","opts":["10 vạn","20 vạn","30 vạn","50 vạn"],"ans":2,"difficulty":"medium"},
  {"id":9,"q":"Câu nổi tiếng trong 'Nam quốc sơn hà' là gì?","opts":["Nước Nam có vua Nam ở","Sông núi nước Nam vua Nam ở","Đất nước ta tự do","Không sợ giặc nào"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Lý Thường Kiệt phá thành nào của nhà Tống?","opts":["Biện Kinh","Ung Châu, Liêm Châu, Khâm Châu","Hàng Châu","Quảng Châu"],"ans":1,"difficulty":"hard"},
  {"id":11,"q":"Chiến thắng trên sông Như Nguyệt diễn ra năm nào?","opts":["1075","1076","1077","1078"],"ans":2,"difficulty":"medium"},
  {"id":12,"q":"Lý Thường Kiệt sinh năm nào?","opts":["1019","1030","1050","1070"],"ans":0,"difficulty":"hard"},
  {"id":13,"q":"Sau chiến thắng, Lý Thường Kiệt làm gì?","opts":["Tấn công tiếp","Đàm phán hòa bình","Xưng vương","Nghỉ hưu"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Lý Thường Kiệt còn chinh phạt nước nào ở phía Nam?","opts":["Chân Lạp","Chiêm Thành","Phù Nam","Lào"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"'Nam quốc sơn hà' có bao nhiêu câu?","opts":["2 câu","4 câu","6 câu","8 câu"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Tại sao Lý Thường Kiệt 'tiên phát chế nhân'?","opts":["Muốn mở rộng lãnh thổ","Biết Tống chuẩn bị xâm lược, đánh phủ đầu","Tức giận","Bị ép buộc"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Phòng tuyến sông Như Nguyệt dài bao nhiêu?","opts":["10 km","Hàng trăm km","Vài km","50 km"],"ans":1,"difficulty":"hard"},
  {"id":18,"q":"Lý Thường Kiệt mất năm nào?","opts":["1077","1095","1105","1120"],"ans":2,"difficulty":"hard"},
  {"id":19,"q":"Ai là vua nhà Lý thời Lý Thường Kiệt?","opts":["Lý Thái Tổ","Lý Nhân Tông","Lý Thái Tông","Lý Thánh Tông"],"ans":1,"difficulty":"hard"},
  {"id":20,"q":"'Nam quốc sơn hà' được vang lên trong hoàn cảnh nào?","opts":["Lễ hội","Đêm khuya trên phòng tuyến, quân sĩ nghe thấy","Trong triều đình","Trước trận đánh"],"ans":1,"difficulty":"medium"},
]

# Dynasty events
bank["d_tayon"] = [
  {"id":1,"q":"Phong trào Tây Sơn do mấy anh em lãnh đạo?","opts":["2","3","4","5"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Quang Trung (Nguyễn Huệ) đại phá quân Thanh năm nào?","opts":["1785","1787","1789","1792"],"ans":2,"difficulty":"easy"},
  {"id":3,"q":"Quân Thanh bao nhiêu vạn bị đánh bại?","opts":["10 vạn","20 vạn","29 vạn","50 vạn"],"ans":2,"difficulty":"medium"},
  {"id":4,"q":"Nguyễn Huệ đại phá quân Thanh trong bao nhiêu ngày?","opts":["3 ngày","5 ngày","7 ngày","10 ngày"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Trận đánh quyết định đêm Tết Kỷ Dậu diễn ra ở đâu?","opts":["Hà Nội","Đống Đa (Ngọc Hồi - Đống Đa)","Huế","Quy Nhơn"],"ans":1,"difficulty":"medium"},
  {"id":6,"q":"Khởi nghĩa Tây Sơn nổ ra ở đâu?","opts":["Thanh Hóa","Tây Sơn, Bình Định","Huế","Hà Nội"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"3 anh em Tây Sơn gồm ai?","opts":["Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ","Nguyễn Ánh, Nguyễn Huệ, Nguyễn Lữ","Lê Lợi, Nguyễn Trãi, Lê Lai","Trần Hưng Đạo, Trần Quốc Tuấn, Trần Nhân Tông"],"ans":0,"difficulty":"easy"},
  {"id":8,"q":"Quang Trung mất năm bao nhiêu tuổi?","opts":["35","39","45","50"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Ai mời quân Thanh sang xâm lược?","opts":["Chúa Trịnh","Vua Lê Chiêu Thống","Nguyễn Ánh","Chúa Nguyễn"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Tây Sơn đánh đổ mấy thế lực?","opts":["1","2","3 (Chúa Nguyễn, Chúa Trịnh, quân Thanh)","4"],"ans":2,"difficulty":"medium"},
  {"id":11,"q":"Quang Trung lên ngôi năm nào?","opts":["1786","1788","1789","1792"],"ans":1,"difficulty":"medium"},
  {"id":12,"q":"Quê hương Tây Sơn thuộc tỉnh nào ngày nay?","opts":["Gia Lai","Bình Định","Phú Yên","Khánh Hòa"],"ans":1,"difficulty":"medium"},
  {"id":13,"q":"Tướng Thanh bị chết trong trận Đống Đa là ai?","opts":["Càn Long","Tôn Sĩ Nghị","Sầm Nghi Đống","Phúc Khang An"],"ans":2,"difficulty":"hard"},
  {"id":14,"q":"Quang Trung dùng chiến thuật gì đánh quân Thanh?","opts":["Thủy chiến","Hành quân thần tốc, đánh bất ngờ đêm Tết","Vây hãm","Phòng thủ"],"ans":1,"difficulty":"medium"},
  {"id":15,"q":"Sau khi Quang Trung mất, ai chiếm lại đất nước?","opts":["Chúa Trịnh","Nguyễn Ánh (Gia Long)","Nhà Thanh","Nhà Minh"],"ans":1,"difficulty":"medium"},
  {"id":16,"q":"Quang Trung có nguyện vọng gì chưa thực hiện được?","opts":["Đánh Thanh lần nữa","Thống nhất lãnh thổ, cải cách chữ Nôm","Xây cung điện","Mở rộng sang Lào"],"ans":1,"difficulty":"hard"},
  {"id":17,"q":"Phong trào Tây Sơn bắt đầu năm nào?","opts":["1765","1771","1778","1785"],"ans":1,"difficulty":"easy"},
  {"id":18,"q":"Nhà Tây Sơn tồn tại đến năm nào?","opts":["1792","1795","1800","1802"],"ans":3,"difficulty":"medium"},
  {"id":19,"q":"Đống Đa ngày nay thuộc đâu?","opts":["Quận Đống Đa, Hà Nội","Bình Định","Huế","Thanh Hóa"],"ans":0,"difficulty":"easy"},
  {"id":20,"q":"Quang Trung được đánh giá là gì?","opts":["Vua tàn bạo","Thiên tài quân sự, nhà cải cách","Vua yếu đuối","Vua bình thường"],"ans":1,"difficulty":"easy"},
]

bank["d_nguyen"] = [
  {"id":1,"q":"Nhà Nguyễn được lập năm nào?","opts":["1788","1800","1802","1810"],"ans":2,"difficulty":"easy"},
  {"id":2,"q":"Ai là vua đầu tiên nhà Nguyễn?","opts":["Minh Mạng","Gia Long (Nguyễn Ánh)","Tự Đức","Thiệu Trị"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Kinh đô nhà Nguyễn đặt ở đâu?","opts":["Hà Nội","Huế (Phú Xuân)","Sài Gòn","Đà Nẵng"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Pháp xâm lược Việt Nam năm nào?","opts":["1845","1858","1862","1884"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Nhà Nguyễn có bao nhiêu đời vua?","opts":["9","11","13","15"],"ans":2,"difficulty":"medium"},
  {"id":6,"q":"Vua cuối cùng nhà Nguyễn là ai?","opts":["Tự Đức","Bảo Đại","Khải Định","Duy Tân"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Bảo Đại thoái vị năm nào?","opts":["1940","1945","1946","1954"],"ans":1,"difficulty":"easy"},
  {"id":8,"q":"Hiệp ước nào khiến VN hoàn toàn thành thuộc địa Pháp?","opts":["Nhâm Tuất","Giáp Tuất","Hiệp ước Patenôtre 1884","Hiệp ước Hác-măng"],"ans":2,"difficulty":"hard"},
  {"id":9,"q":"Thành nhà Nguyễn ở Huế được UNESCO công nhận là?","opts":["Di sản tự nhiên","Di sản văn hóa thế giới","Khu dự trữ sinh quyển","Không được công nhận"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Nguyễn Ánh nhờ ai giúp đánh Tây Sơn?","opts":["Nhà Thanh","Pháp (Bá Đa Lộc)","Anh","Hà Lan"],"ans":1,"difficulty":"medium"},
  {"id":11,"q":"Nhà Nguyễn tồn tại đến năm nào?","opts":["1884","1900","1945","1954"],"ans":2,"difficulty":"easy"},
  {"id":12,"q":"Quốc hiệu Việt Nam được dùng chính thức từ thời vua nào?","opts":["Gia Long","Minh Mạng","Tự Đức","Bảo Đại"],"ans":0,"difficulty":"hard"},
  {"id":13,"q":"Vua Minh Mạng nổi tiếng về gì?","opts":["Yếu đuối","Cải cách hành chính, cấm đạo Thiên Chúa","Mở cửa buôn bán","Đầu hàng Pháp"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Ai là vua yêu nước, bị Pháp bắt đày?","opts":["Hàm Nghi","Bảo Đại","Đồng Khánh","Thành Thái"],"ans":0,"difficulty":"medium"},
  {"id":15,"q":"Pháp tấn công Đà Nẵng trước hay Sài Gòn?","opts":["Đà Nẵng trước (1858)","Sài Gòn trước","Cùng lúc","Huế trước"],"ans":0,"difficulty":"medium"},
  {"id":16,"q":"Nhà Nguyễn bị chỉ trích vì điều gì?","opts":["Quá mạnh","Bế quan tỏa cảng, để mất nước","Quá dân chủ","Quá hiện đại"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Lăng tẩm vua Nguyễn nằm ở đâu?","opts":["Hà Nội","Huế","Sài Gòn","Đà Nẵng"],"ans":1,"difficulty":"easy"},
  {"id":18,"q":"Năm 1862, Pháp buộc nhà Nguyễn ký hiệp ước gì?","opts":["Hiệp ước Nhâm Tuất (nhượng 3 tỉnh miền Đông Nam Kỳ)","Hiệp ước hòa bình","Hiệp ước thương mại","Hiệp ước quân sự"],"ans":0,"difficulty":"hard"},
  {"id":19,"q":"Vua Duy Tân bị Pháp bắt vì sao?","opts":["Tham nhũng","Âm mưu khởi nghĩa chống Pháp","Bỏ trốn","Không chịu làm vua"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Hệ thống kinh thành Huế gồm mấy vòng thành?","opts":["2","3 (Kinh thành, Hoàng thành, Tử Cấm Thành)","4","5"],"ans":1,"difficulty":"medium"},
]

bank["d_phapthuan"] = [
  {"id":1,"q":"Phong trào Cần Vương do ai phát động?","opts":["Phan Bội Châu","Vua Hàm Nghi và Tôn Thất Thuyết","Phan Châu Trinh","Hồ Chí Minh"],"ans":1,"difficulty":"medium"},
  {"id":2,"q":"Phong trào Đông Du do ai khởi xướng?","opts":["Phan Châu Trinh","Phan Bội Châu","Nguyễn Ái Quốc","Huỳnh Thúc Kháng"],"ans":1,"difficulty":"easy"},
  {"id":3,"q":"Đảng Cộng sản Đông Dương thành lập năm nào?","opts":["1925","1930","1935","1940"],"ans":1,"difficulty":"easy"},
  {"id":4,"q":"Cách mạng Tháng Tám thành công năm nào?","opts":["1940","1943","1945","1946"],"ans":2,"difficulty":"easy"},
  {"id":5,"q":"Pháp xâm lược Việt Nam từ năm nào?","opts":["1845","1858","1862","1884"],"ans":1,"difficulty":"easy"},
  {"id":6,"q":"Ai sáng lập Đảng Cộng sản Đông Dương?","opts":["Phan Bội Châu","Nguyễn Ái Quốc (Hồ Chí Minh)","Trần Phú","Lê Duẩn"],"ans":1,"difficulty":"easy"},
  {"id":7,"q":"Đông Du có nghĩa là gì?","opts":["Đi về phương Đông (Nhật Bản) học tập","Đi về phương Tây","Đi về phương Bắc","Ở lại trong nước"],"ans":0,"difficulty":"medium"},
  {"id":8,"q":"Phan Châu Trinh chủ trương gì?","opts":["Bạo động","Dân chủ, khai dân trí","Cầu cứu nước ngoài","Đầu hàng"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Phong trào Cần Vương diễn ra trong khoảng nào?","opts":["1858-1862","1885-1896","1900-1910","1930-1945"],"ans":1,"difficulty":"medium"},
  {"id":10,"q":"Đông Kinh Nghĩa Thục là gì?","opts":["Trường học yêu nước ở Hà Nội","Nhà tù","Quân đội","Đảng chính trị"],"ans":0,"difficulty":"medium"},
  {"id":11,"q":"Xô Viết Nghệ Tĩnh diễn ra năm nào?","opts":["1925","1930-1931","1935","1940"],"ans":1,"difficulty":"hard"},
  {"id":12,"q":"Nguyễn Ái Quốc ra đi tìm đường cứu nước năm nào?","opts":["1905","1911","1920","1925"],"ans":1,"difficulty":"medium"},
  {"id":13,"q":"Hội nghị thành lập Đảng diễn ra ở đâu?","opts":["Hà Nội","Hồng Kông","Paris","Moscow"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Cách mạng Tháng Tám thành công ngày nào?","opts":["19/8/1945","2/9/1945","22/8/1945","15/8/1945"],"ans":0,"difficulty":"medium"},
  {"id":15,"q":"Phong trào nào đòi ân xá cho Phan Bội Châu?","opts":["Cần Vương","Phong trào đấu tranh 1925-1926","Đông Du","Cách mạng Tháng Tám"],"ans":1,"difficulty":"hard"},
  {"id":16,"q":"Khởi nghĩa Yên Bái năm 1930 do ai lãnh đạo?","opts":["Hồ Chí Minh","Nguyễn Thái Học","Phan Bội Châu","Trần Phú"],"ans":1,"difficulty":"medium"},
  {"id":17,"q":"Nguyễn Thái Học nói câu nổi tiếng nào?","opts":["Tổ quốc trên hết","Không thành công cũng thành nhân","Đoàn kết, đoàn kết","Tiên học lễ"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Nạn đói năm 1945 ở miền Bắc khiến bao nhiêu người chết?","opts":["100 nghìn","500 nghìn","1 triệu","2 triệu"],"ans":3,"difficulty":"hard"},
  {"id":19,"q":"Tên gọi Việt Minh là viết tắt của gì?","opts":["Việt Nam Quốc Dân","Việt Nam Độc Lập Đồng Minh Hội","Việt Nam Cộng Hòa","Việt Nam Dân Chủ"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Phong trào chống Pháp kéo dài bao nhiêu năm?","opts":["50 năm","Gần 90 năm (1858-1945)","100 năm","30 năm"],"ans":1,"difficulty":"medium"},
]

bank["d_cachtang"] = [
  {"id":1,"q":"Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày nào?","opts":["19/8/1945","2/9/1945","22/12/1944","7/5/1954"],"ans":1,"difficulty":"easy"},
  {"id":2,"q":"Tuyên ngôn Độc lập mở đầu bằng trích dẫn từ đâu?","opts":["Hiến pháp Pháp","Tuyên ngôn Độc lập Mỹ","Kinh Phật","Không trích dẫn"],"ans":1,"difficulty":"medium"},
  {"id":3,"q":"Chiến thắng Điện Biên Phủ năm nào?","opts":["1950","1952","1954","1956"],"ans":2,"difficulty":"easy"},
  {"id":4,"q":"Ai chỉ huy chiến dịch Điện Biên Phủ?","opts":["Hồ Chí Minh","Đại tướng Võ Nguyên Giáp","Lê Duẩn","Trần Hưng Đạo"],"ans":1,"difficulty":"easy"},
  {"id":5,"q":"Hiệp định Genève chia Việt Nam ở vĩ tuyến nào?","opts":["Vĩ tuyến 15","Vĩ tuyến 16","Vĩ tuyến 17","Vĩ tuyến 20"],"ans":2,"difficulty":"medium"},
  {"id":6,"q":"Thống nhất đất nước ngày nào?","opts":["2/9/1945","7/5/1954","30/4/1975","2/7/1976"],"ans":2,"difficulty":"easy"},
  {"id":7,"q":"Hiệp định Paris ký năm nào?","opts":["1968","1970","1973","1975"],"ans":2,"difficulty":"medium"},
  {"id":8,"q":"Tết Mậu Thân diễn ra năm nào?","opts":["1965","1968","1970","1972"],"ans":1,"difficulty":"medium"},
  {"id":9,"q":"Chiến dịch Hồ Chí Minh là chiến dịch nào?","opts":["Điện Biên Phủ","Giải phóng Sài Gòn 30/4/1975","Tết Mậu Thân","Đường 9 Khe Sanh"],"ans":1,"difficulty":"easy"},
  {"id":10,"q":"Xe tăng nào húc đổ cổng Dinh Độc Lập?","opts":["T-34","T-54 số 843","T-72","M48"],"ans":1,"difficulty":"hard"},
  {"id":11,"q":"Hồ Chí Minh mất năm nào?","opts":["1965","1967","1969","1975"],"ans":2,"difficulty":"medium"},
  {"id":12,"q":"Đường Trường Sơn (đường Hồ Chí Minh) dùng để làm gì?","opts":["Du lịch","Chi viện cho miền Nam","Buôn bán","Nghiên cứu"],"ans":1,"difficulty":"easy"},
  {"id":13,"q":"Điện Biên Phủ trên không năm 1972 là trận gì?","opts":["Đánh trên mặt đất","Bắn rơi B-52 Mỹ trên bầu trời Hà Nội","Trận hải quân","Trận biên giới"],"ans":1,"difficulty":"medium"},
  {"id":14,"q":"Chiến thắng Điện Biên Phủ đánh bại ai?","opts":["Mỹ","Pháp","Nhật","Trung Quốc"],"ans":1,"difficulty":"easy"},
  {"id":15,"q":"Tổng thống VNCH cuối cùng là ai?","opts":["Ngô Đình Diệm","Nguyễn Văn Thiệu","Dương Văn Minh","Trần Văn Hương"],"ans":2,"difficulty":"medium"},
  {"id":16,"q":"Việt Nam thống nhất chính thức thành 1 nước năm nào?","opts":["1975","1976","1977","1978"],"ans":1,"difficulty":"hard"},
  {"id":17,"q":"Đại tướng Võ Nguyên Giáp được mệnh danh là gì?","opts":["Hổ tướng","Đại tướng của nhân dân","Tướng sấm sét","Đại tướng huyền thoại"],"ans":1,"difficulty":"medium"},
  {"id":18,"q":"Kháng chiến chống Pháp kéo dài bao lâu?","opts":["5 năm","9 năm (1945-1954)","15 năm","20 năm"],"ans":1,"difficulty":"medium"},
  {"id":19,"q":"Kháng chiến chống Mỹ kéo dài bao lâu?","opts":["10 năm","Khoảng 21 năm (1954-1975)","25 năm","30 năm"],"ans":1,"difficulty":"medium"},
  {"id":20,"q":"Sài Gòn đổi tên thành gì sau 1975?","opts":["Hà Nội","Thành phố Hồ Chí Minh","Thống Nhất","Gia Định"],"ans":1,"difficulty":"easy"},
]

# Fill any remaining empty events with at least a few questions
# to ensure every event has something
for eid in list(bank.keys()):
    if not bank[eid]:
        del bank[eid]

# Save
import os
out_path = os.path.join("static", "quiz_bank.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(bank, f, ensure_ascii=False, indent=1)

total = sum(len(v) for v in bank.values())
print(f"Generated {total} questions across {len(bank)} events")
print(f"Saved to {out_path}")
