resource "aws_launch_configuration" "server" {
  name            			 = "web_server"
  image_id        			 = var.ami_id
  instance_type   			 = var.instance_type
  key_name			         = var.key_name
  security_groups  		 	 = [aws_security_group.allow_http.id]
  iam_instance_profile 	 = aws_iam_instance_profile.ag_profile.name
}

resource "aws_autoscaling_group" "asg_server" {
  availability_zones 		= ["ap-northeast-2a"]
  desired_capacity   		= var.desired_capacity
  max_size          		= var.max_size
  min_size          		= var.min_size
	launch_configuration	= aws_launch_configuration.server.name
}

resource "aws_autoscaling_attachment" "asg_attachment_elb" {
  autoscaling_group_name = aws_autoscaling_group.asg_server.id
  alb_target_group_arn = aws_lb_target_group.back_end_tg.arn
}