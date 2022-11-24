import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickPayment = () => {

    //가맹점 식별
    const {IMP} = window;
    IMP.init('imp83775327');
  
      //결제 데이터 정의
      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: location.state.finalAmount,
        name: location.state.itemData[0].name,
        buyer_name: '홍길동',
        buyer_tel: '01012345678',
        buyer_email: 'example@example.com',
        buyer_addr: '미래동 490',
        buyer_postcode: '04036'
      }, function(res){
        console.log(res);
        if(res.success){
          //결제 성공 시 로직
          const msg = '결제가 완료되었습니다.';
          alert(msg);
          navigate('/');
        } else {
          //결제 실패 시 로직
          const msg = `결제 실패: ${res.error_msg}`;
          alert(msg);
          navigate('/cart');
        }
      });
      
    }

  return (
    <>
      {onClickPayment()};
    </>
  )
}

export default Payment;