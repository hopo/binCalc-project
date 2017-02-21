package javapractice;

class Calcultor{
	int left, right;
	public void setOprands(int left, int right){
		this.left=left;
		this.right=right;
		System.out.println(("input A:"+left+"")+" - "+("input B:"+right+""));
	}

	void orBox(){
		if((left==1 && right==1) || (left==0 || left==0)){
			System.out.println("orBox(1)");
		}else{
			System.out.println("orBox(0)");
		}
	}
	void andBox(){
		if(left==1 && right==1){
			System.out.println("andBox(1)");
		}else{
			System.out.println("andBox(0)");
		}
	}
}

public class orandDemo{
	public static void main (String[] args){
		Calcultor c = new Calcultor();
		c.setOprands(0,0);
		c.orBox();
		c.andBox();
	}
}